class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  // Custom function to greet the user
  greet = () => {
    const message = this.createChatBotMessage("Hello! How can I assist you today?");
    this.setChatbotMessage(message);
  }

  // Custom function to describe Companion
  describeCompanion = () => {
    const message = this.createChatBotMessage("Description Companion");
    this.setChatbotMessage(message);
  }

  // Custom function to list Companion functionalities
  listCompanionFunctionalities = () => {
    const message = this.createChatBotMessage("Fonctionnalites Companion");
    this.setChatbotMessage(message);
  }

  // Function to update the chatbot state
  setChatbotMessage = (message) => {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  }
}

export default ActionProvider;
