$(document).ready(function() {
    $("#runBtn").click(function() {
        runcode();
    });
    $("#resetBtn").click(function() {
        reset();
    });
});

Blockly.Blocks['statement'] = {
    init: function() {
        this.appendStatementInput("Bott")
            .setCheck(null)
            .appendField("Bot");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['ask_me_a_question'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Ask me a question")
            .appendField(new Blockly.FieldDropdown([
                ["What is the date today?", "a"],
                ["What is the time now?", "b"],
                ["How are you?", "c"],
                ["What is JavaScript?", "d"],
                ["What is your name?", "e"]
            ]), "Ask me a Question");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(165);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['statement'] = function(block) {
    boxText = "";
    code = '';
    var statements_bot = Blockly.JavaScript.statementToCode(block, 'Bott');
    code += statements_bot;
    console.log(statements_bot);
    return code;
};

Blockly.JavaScript['ask_me_a_question'] = function(block) {

    var dropdown_ask_me_a_question = block.getFieldValue('Ask me a Question');
    return intiateBot(dropdown_ask_me_a_question);
};

function intiateBot(dropdown_ask_me_a_question) {
    let code = "";
    if (dropdown_ask_me_a_question === "a") {
        code = `boxText += "The date is: " + new Date().toLocaleDateString();`
    } else if (dropdown_ask_me_a_question === "b") {
        code = `boxText += "The time is: " + new Date().toLocaleTimeString();`
    } else if (dropdown_ask_me_a_question === "c") {
        code = `boxText += "I am fine, thank you. :)";`
    } else if (dropdown_ask_me_a_question === "d") {
        code = `boxText += "JavaScript is a scripting or programming language that allows you to implement complex features on web pages";`
    } else if (dropdown_ask_me_a_question === "e") {
        code = `boxText += "I am Bot.";`
    }
    code += `\nboxText += "<br><br>";\n`
    return code;
}

var workspace = Blockly.inject("blocklyDiv", {
    media: "assets/media/",
    toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
    if (typeof boxText !== "undefined") {
        $("#inputBox").html(boxText);
    } else {
        $("#inputBox").html("");
    }
}

function runcode() {
    try {
        code = '';
        eval(Blockly.JavaScript.workspaceToCode(workspace));
    } catch (e) {
        console.error(e);
    }
    redrawUi();
}

function reset() {
    delete inputTextValue;
    delete boxText;
    redrawUi();
    Blockly.mainWorkspace.clear();
}