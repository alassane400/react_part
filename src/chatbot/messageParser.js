class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(message);
    const lowercase = message.toLowerCase();

    if (lowercase.includes("hello")) {
      this.actionProvider.greet();
    }

    if (lowercase.includes("quoi") && lowercase.includes("companion")) {
      this.actionProvider.describeCompanion();
    }

    if (lowercase.includes("fonctionnalites") && lowercase.includes("companion")) {
      this.actionProvider.listCompanionFunctionalities();
    }
  }
}

export default MessageParser;
