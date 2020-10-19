$(document).ready(function() {
    $("#runBtn").click(function() {
        runcode();
    });
    $("#resetBtn").click(function() {
        reset();
    });
});

// Blockly.Blocks["example_input_text"] = {
//     init: function() {
//         this.appendDummyInput()
//             .appendField("Example Block:")
//             .appendField(new Blockly.FieldTextInput("write here..."), "input");
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour(230);
//         this.setTooltip("");
//         this.setHelpUrl("");
//     },
// };

Blockly.Blocks['bot'] = {
    init: function() {
        this.appendStatementInput("Bot")
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

Blockly.JavaScript['bot'] = function(block) {
    var statements_bot = Blockly.JavaScript.statementToCode(block, 'Bot');
    // statements_bot.setNextStatement();
    return code;
};

Blockly.JavaScript['ask_me_a_question'] = function(block) {

    var dropdown_ask_me_a_question = block.getFieldValue('Ask me a Question');
    intiateBot(dropdown_ask_me_a_question);
};

function intiateBot(dropdown_ask_me_a_question) {
    // var code = ``
    boxText = "";
    if (dropdown_ask_me_a_question === "a") {
        // today = new Date().toISOString().slice(0, 10).toString();
        boxText += new Date().toLocaleDateString();
        // window.alert(today);
    } else if (dropdown_ask_me_a_question === "b") {
        boxText += new Date().toLocaleTimeString();
    } else if (dropdown_ask_me_a_question === "c") {
        boxText += "I am fine, thank you. :)";
    } else if (dropdown_ask_me_a_question === "d") {
        boxText += "JavaScript is a scripting or programming language that allows you to implement complex features on web pages";
    } else if (dropdown_ask_me_a_question === "e") {
        boxText += "I am Bot.";
    }
    redrawUi();
    // return code;
}

// Blockly.JavaScript["example_input_text"] = function(block) {
//     var text_input = block.getFieldValue("input");

//     var code = `
// var inputTextValue = "${text_input}";
// `;
//     return code;
// };

var workspace = Blockly.inject("blocklyDiv", {
    media: "assets/media/",
    toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
    // if (typeof inputTextValue !== "undefined") {
    //     $("#inputBox").text(inputTextValue);
    // } else {
    //     $("#inputBox").clear;
    //     // Blockly.mainWorkspace.clear();
    // }
    if (typeof boxText !== "undefined") {
        $("#inputBox").text(boxText);
    } else {
        $("#inputBox").text("");
    }
}

function runcode() {
    // Generate JavaScript code and run it.
    var geval = eval;
    try {
        geval(Blockly.JavaScript.workspaceToCode(workspace));
    } catch (e) {
        console.error(e);
    }
    // redrawUi();
}

function reset() {
    delete inputTextValue;
    delete boxText;
    redrawUi();
    Blockly.mainWorkspace.clear();
}