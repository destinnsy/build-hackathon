import os
from dotenv import load_dotenv

load_dotenv()

from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate
from system_prompts import analyze_target_audience_prompt, analyze_product_principles_prompt, analyze_problem_size_prompt, success_metrics_evaluator_prompt, summarizer_prompt

model = init_chat_model("gpt-4o", model_provider="openai")

def analyze_problem_statement(problem_statement):
    return prompt_model(analyze_product_principles_prompt, problem_statement)

def analyze_target_audience(target_audience):
    return prompt_model(analyze_target_audience_prompt, target_audience)

def analyze_problem_size(problem_statement):
    return prompt_model(analyze_problem_size_prompt, problem_statement)

def summarize_problem_statement(problem_statement, metrics_input):
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", summarizer_prompt),
            ("user", "{input}")
        ]
    )
    chain = prompt | model
    summary_response = chain.invoke({"input": problem_statement})

    print(summary_response.content)

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", success_metrics_evaluator_prompt),
            ("user", """
# Problem
{summary}
             
# Success Metrics
{input}
""")
        ]
    )
    chain = prompt | model
    response = chain.invoke({"input": metrics_input, "summary": summary_response.content})
    print(response.content)
    # Clean up response content by stripping everything before first { and after last }
    content = response.content
    start_idx = content.find('{')
    end_idx = content.rfind('}')
    
    if start_idx != -1 and end_idx != -1:
        content = content[start_idx:end_idx + 1]
    
    return content
    

def prompt_model(prompt, input):
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", prompt),
            ("user", "{input}")
        ]
    )
    chain = prompt | model
    response = chain.invoke({"input": input})
    print(response.content)
    
    # Clean up response content by stripping everything before first { and after last }
    content = response.content
    start_idx = content.find('{')
    end_idx = content.rfind('}')
    
    if start_idx != -1 and end_idx != -1:
        content = content[start_idx:end_idx + 1]
    
    return content