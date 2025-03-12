


import os
from fastapi import APIRouter
from swarm import Swarm, Agent
import databutton as db
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import json
from json import JSONDecodeError
from datetime import datetime, timedelta

def get_next_wednesday():
    today = datetime.now()
    days_ahead = (2 - today.weekday() + 7) % 7
    next_wednesday = today + timedelta(days=days_ahead)
    return next_wednesday.strftime("%Y-%m-%d")

def get_appointments() -> Dict:
    try:
        return json.loads(db.storage.text.get("appointments"))
    except (JSONDecodeError, KeyError, FileNotFoundError):
        return {}

def save_appointments(appointments):
    db.storage.text.put("appointments", json.dumps(appointments))


router = APIRouter()


os.environ["OPENAI_API_KEY"] = db.secrets.get("OPENAI_API_KEY")

client = Swarm()

def book_appointment(date: str, time: str) -> str:
    appointments = get_appointments()
    appointment_key = f"{date}_{time}"
    
    if appointment_key in appointments:
        return f"Sorry, the time slot for {date} at {time} is already booked."
    
    appointments[appointment_key] = {
        "date": date,
        "time": time,
        "booked_at": datetime.now().isoformat()
    }
    
    save_appointments(appointments)
    return f"Appointment booked successfully for {date} at {time}."

def agent_book_appointment(date: str = "next_wednesday", time: str = "15:00") -> dict:
    if date == "next_wednesday":
        date = get_next_wednesday()
    result = book_appointment(date, time)
    success = "successfully" in result
    return {"result": result, "success": success, "date": date, "time": time}

triage_agent = Agent(
    name="Triage Agent",
    instructions="You are a healthcare triage agent. Help users describe their symptoms and determine which healthcare-related agent they should speak to (e.g., for medical advice, scheduling an appointment, or checking prescription details).",
)

medical_advice_agent = Agent(
    name="Medical Advice Agent",
    instructions="You are a medical professional. Provide general medical advice based on symptoms described.",
)

appointment_scheduling_agent = Agent(
    name="Appointment Scheduling Agent",
    instructions="You are an appointment scheduler. Help users schedule healthcare appointments. You can book appointments using the book_appointment function. If the user asks for 'next Wednesday', you can use that directly as the date parameter.",
    functions=[agent_book_appointment]
)

prescription_details_agent = Agent(
    name="Prescription Details Agent",
    instructions="You are a pharmacist. Provide information about prescriptions and medication details.",
)

def transfer_to_medical_advice():
    return medical_advice_agent

def transfer_to_appointment_scheduling():
    return appointment_scheduling_agent

def transfer_to_prescription_details():
    return prescription_details_agent

triage_agent.functions.extend([
    transfer_to_medical_advice,
    transfer_to_appointment_scheduling,
    transfer_to_prescription_details
])

class ProcessMessageRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = None 


class ProcessMessageResponse(BaseModel):
    messages: List[dict]
    updated_history: List[dict]  
    agent_name: str = Field(..., description="The name of the agent that processed the message")


@router.post("/process_message_v1")
def process_message_v1(request: ProcessMessageRequest) -> ProcessMessageResponse:
    print(request.message)
    
   
    messages = request.history or []
    

    messages.append({"role": "user", "content": request.message})
    

    response = client.run(agent=triage_agent, messages=messages)
    
    print(response)
    print(response.messages[-1]["content"])
    print(response.agent.name)
    
  
    updated_history = messages + response.messages
    
    return ProcessMessageResponse(
        messages=response.messages,
        updated_history=updated_history,
        agent_name=response.agent.name
    )