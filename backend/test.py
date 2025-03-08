import os
from dotenv import load_dotenv
from llm import analyze_problem_statement
load_dotenv()

from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate

model = init_chat_model("gpt-4o", model_provider="openai")

inputText = """
## Current Situation

There is an increasing number of first-time parents facing challenges in adapting to parenthood, leading to elevated stress levels and feelings of inadequacy. The primary responsibility of Child Development Center Coordinators ("CDCCs") is to provide guidance and resources to new parents in their districts. However, today, CDCCs struggle to effectively reach and support new parents beyond their usual network due to the following constraints:

### Limited outreach capabilities and resource-intensive processes

Awareness of support services is low due to outdated communication methods

CDCCs primarily rely on physical pamphlets distributed at hospitals and health centers, along with occasional community bulletin boards to advertise parenting workshops and resources. These physical materials often get overlooked as new parents are overwhelmed with information during hospital discharge. Digital resources exist but are scattered across multiple websites and platforms, making them difficult for tired new parents to navigate.

New parents experiencing difficulties often require personalized support to accept assistance

Many struggling new parents are reluctant to seek help due to fear of judgment or appearing incompetent. Therefore, CDCCs must arrange one-on-one meetings or make personal phone calls to build trust and encourage participation in support programs. This entire process of personalized outreach requires significant time investment per family.

### CDCCs face critical resource constraints

Although Early Childhood Educators ("ECEs") and Public Health Nurses ("PHNs") are available to assist CDCCs with outreach and education, their availability varies dramatically by district, and their primary duties often take precedence over new parent outreach. Additionally, budget constraints limit the hiring of additional support staff.

Consequently, these limitations prevent CDCCs from effectively scaling their outreach and support to new parents who need it most.

## Impact of Problem if left unaddressed

With declining birth rates but increasing parental stress levels, the challenge of supporting new parents effectively will continue to grow in importance. Research indicates that insufficient support during early parenthood is associated with higher rates of postpartum depression, reduced breastfeeding duration, and negative impacts on child development outcomes.

From a public health perspective, addressing this issue aligns with the Ministry of Health's priority initiatives for maternal and child health support and the government's strategic focus on supporting families with young children.

## Total Addressable Market

Approximately 23% of new parents experience significant difficulties in the first year of parenthood.

Year 2020 – 34,567 new parents reported struggles
Year 2023 – 42,876 new parents reported struggles

The projected number of new parents needing additional support in 2024 is roughly 45,000. This figure is expected to remain significant despite declining birth rates due to increasing complexity of modern parenting challenges.

## Note

During our research, we discovered that some CDCCs have begun using private social media groups to provide support to new parents more effectively. However, this approach often results in CDCCs being available 24/7 and responding to questions outside of working hours. Feedback from CDCCs indicates this is contributing to burnout and difficulty maintaining professional boundaries.

We need to develop a solution that enhances support for new parents while respecting the work-life balance of the CDCCs delivering these essential services.
"""


print(analyze_problem_statement(inputText))

badInput = """
Problem Statement: Healthcare Communication Platform
There is a critical communication gap in the healthcare ecosystem that impedes efficient patient care and medical knowledge sharing. Medical professionals struggle to securely discuss patient cases with specialists for second opinions, while patients have difficulty understanding their treatment plans and medication instructions. Additionally, medical students and residents lack access to real-world case studies that would enhance their learning experience.
We need to develop a HIPAA-compliant communication platform that connects physicians, specialists, patients, and medical students in a secure environment. The platform should enable healthcare providers to collaborate on complex cases, allow patients to better understand and participate in their care plans, and provide educational opportunities for medical students through anonymized case studies. The solution must work across various devices and integrate with existing electronic health record systems.
"""

badInput2 = """
Problem Statement: Urban Mobility Solution
The rapid growth of metropolitan areas has created significant transportation challenges. Congested roads lead to longer commute times, increased pollution, and reduced quality of life. Traditional public transportation systems are often insufficient to meet the diverse mobility needs of urban populations.
Our initiative seeks to develop an integrated mobility platform that addresses these challenges by connecting various transportation modes and optimizing travel patterns. The solution will provide real-time routing that considers traffic conditions, weather, and user preferences. It will highlight more sustainable travel options while still accommodating those who need private vehicle transport.
Commuters should be able to plan multi-modal journeys that combine public transit, micro-mobility options, and ridesharing. Transportation planners will gain valuable insights from aggregated, anonymized travel pattern data. Local businesses along transportation corridors may leverage the platform for location-based promotions.
The solution needs to be accessible across socioeconomic backgrounds, offer features for those with mobility constraints, and provide both digital and physical payment options. It should ultimately reduce travel times, lower carbon emissions, and improve the urban experience.
"""

print(analyze_problem_statement(badInput))


print(analyze_problem_statement(badInput2))