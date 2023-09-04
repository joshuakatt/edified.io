# edified.io
## Intelligent Note taking app

A Generative AI application built on NextJS 13 with a Flask Python Backend, built completely by me. <br>
Deployed on Azure Kubernetes Service. <br>

View Sep 4 Deployment: (http://20.242.138.31/)

- OpenAI's completion features/Generative AI
- Bert's powerful summarization features.
  
## Installation
## Frontend

### Navigate to the Frontend directory.
Run npm install to install the required packages.
Run npm run dev to start the development server.
### Backend
Navigate to the backend directory.
Run pip install -r requirements.txt to install the required Python packages.
Run the Python script to start the backend server.
### Kubernetes
Navigate to the kubernetes-configs directory.
Run kubectl apply -f . to deploy the application on a Kubernetes cluster.

## UI
I used Different components to build the UI:
- Shadcdn's amazing library of UI components.
- Chakra UI

## Backend
- Using OpenAI's DaVinci model for text generation, Bert's Huggingface Model for summarization and TextRazor's API for link generation.
- I used a Python Flask server to handle all API calls.
- I used Axios as well
- Used Python's thread pool executor for concurrency.
- 
## Contributing
Please contact me for the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.


