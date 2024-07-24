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

    if (lowercase.includes("présentation") || lowercase.includes("historique") || lowercase.includes("association")) {
      this.actionProvider.describeCompanion();
    }

    if (lowercase.includes("missions") || lowercase.includes("fonctionnalités") || lowercase.includes("services")) {
      this.actionProvider.listCompanionFunctionalities();
    }

    if (lowercase.includes("événements") || lowercase.includes("participation") || lowercase.includes("tâches")) {
      this.actionProvider.handleEventManagement();
    }

    if (lowercase.includes("votes") || lowercase.includes("sondages") || lowercase.includes("consultation")) {
      this.actionProvider.handleVoteAndConsultation();
    }

    if (lowercase.includes("GED") || lowercase.includes("gestion documentaire") || lowercase.includes("stockage des documents")) {
      this.actionProvider.handleGED();
    }
  }
}

export default MessageParser;
