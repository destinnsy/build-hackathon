import os
from dotenv import load_dotenv

load_dotenv()

from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate
from system_prompts import analyze_target_audience_prompt

model = init_chat_model("gpt-4o", model_provider="openai")

def analyze_problem_statement(problem_statement):
    return prompt_model(analyze_target_audience_prompt, problem_statement)

def prompt_model(prompt, input):
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", prompt),
            ("user", "{input}")
        ]
    )
    chain = prompt | model
    return chain.invoke({"input": input}).content