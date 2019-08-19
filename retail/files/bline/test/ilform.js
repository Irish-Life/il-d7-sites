// Create a class for the element
class CalcForm extends HTMLFormElement {

  constructor() {
    // Always call super first in constructor
    super();
    this.id = "ilform";
  }

  connectedCallback() {
    //Set up child nodes and initialise event listeners etc. when the element is first connected.
    console.log("Connected");
    this.addInput("range", "cover", { id: "cover", min: 1000, max: 500000, step: 500, required: true });
    this.addLabel("cover", "Cover Required");
    this.addOutput("cover", "output", "output");
    this.addLabel("output", "Cover Value");
    this.addSelect({ "2": "2 Years", "3": "3 Years", "4": "4 Years" }, "term");
    this.addLabel("term", "Term");

    this.addInput("number", "age", { max: 100, required: true });
    this.addLabel("age", "What is your age?");

    this.addSelect({ "n": "No", "y": "Yes" }, "smoker1");
    this.addLabel("smoker1", "Are you a smoker?");

    this.addInput("number", "age2", { max: 100, required: true });
    this.addLabel("age2", "Age of person two");

    this.addSelect({ "n": "No", "y": "Yes" }, "smoker2");
    this.addLabel("smoker2", "Is person 2 a smoker?");

    this.addInput("submit", "submit", { value: "Submit" });

    this.setMethod("get");
    //this.setAction("#result");

    this.setEventListener(this.id, "submit", function (event) {
      event.preventDefault();
      let results = this.elements;
      this.validate(results);
      let resultString = "";
      let quoteUser = document.getElementById("output").value;

      let url = `https://www.irishlife.ie/myonlineservices/servlet/LifeCoverQuote/?quickQuoteId=lifeTermSum&productId=19&coverTypeCd=L&indexation=False&frequencyCd=M&conversion=False&jointLife=False&dateOfBirth1Day=7&dateOfBirth1Month=11&dateOfBirth1Year=1975&sexCd1=M&smokerCd1=N&lifeCoverAmt=${quoteUser}&term=20`;

      let ajax = new XMLHttpRequest();
      ajax.open("GET", url);
      ajax.onload = function (data) {
        let text = document.createTextNode(`Data has been fetched: ${this.responseText}`);
        console.log(text);
        document.getElementById("result").append(text);
      }
      ajax.send();
      //       for (let i = 0; i < results.length; i++) {
      //         if ((results[i].type === "radio" && results[i].checked) || results[i].type === "checkbox" && results[i].checked) {
      //           resultString += results[i].value + " ";
      //         }
      //         else if (results[i].type !== "radio" && results[i].type !== "checkbox" && results[i].type !== "submit") {
      //           resultString += results[i].value + " ";
      //         }
      //       }
      document.getElementById("result").innerHTML = resultString;
    });

    this.setEventListener("cover", "input", function (event) {
      let output = document.getElementById("output");
      output.value = this.value;
    });

    this.setupStyles({
      backgroundColor: "#efefef",
      margin: "1em 1em",
      padding: "2em",
      maxWidth: "30em",
      minWidth: "30em",
      display: "flex",
      flexFlow: "column nowrap"
    });
  }

  addInput(type, name, options) {
    let field = document.createElement("input");
    field.type = type;
    if (name) {
      field.name = name;
    }
    if (options) {
      for (var key in options) {
        switch (key) {
          case "id":
            field.id = options[key];
            break;
          case "min":
            field.min = options[key];
            break;
          case "max":
            field.max = options[key];
            break;
          case "step":
            field.step = options[key];
            break;
          case "value":
            field.setAttribute("value", options[key]);
            break;
          case "onchange":
            field.onchange = options[key];
            break;
          case "oninput":
            field.oninput = options[key];
            break;
          case "onclick":
            field.onclick = options[key];
            break;
          case "required":
            field.required = options[key];
            break;
          case "class":
            field.classList.add(options[key]);
            break;
        }
      }
    }
    //Beware of materialize classes addition here
    if (field.type === "submit") {
      field.classList.add("waves-effect", "waves-light", "btn");
    }
    this.append(field);
  }

  addOutput(owner, id, name) {
    var output = document.createElement("output");
    output.setAttribute("for", owner);
    output.id = id;
    output.name = name;
    output.value = "0";
    this.append(output);
  }

  addLabel(elem, text) {
    let label = document.createElement("label");
    label.setAttribute("for", elem);
    let content = document.createTextNode(text);
    label.append(content);
    //label.innerHTML = text;
    let target = document.querySelector('[name="' + elem + '"]');
    if (target) {
      this.insertBefore(label, target);
    }
    else {
      throw new error("Target does not exist");
    }
  }

  addSelect(options, name) {
    let select = document.createElement("select");
    if (name) {
      select.name = name;
    }

    for (let key in options) {
      let option = document.createElement("option");
      option.value = key;
      option.text = options[key];
      select.appendChild(option);
    }
    select.style.display = "inline-block";
    this.append(select);
  }

  addRadio(group, options, label) {
    let radioLabel = document.createElement("label");
    radioLabel.innerHTML = label;
    radioLabel.setAttribute("for", group);
    this.append(radioLabel);

    let count = 0;
    for (let option in options) {
      let span = document.createElement("span");
      span.innerHTML = option;
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.value = options[option];
      radio.name = group;
      radio.id = group + "-" + count;

      let markup = document.createElement("label");
      markup.setAttribute("for", group + "-" + count);
      markup.appendChild(radio);
      markup.appendChild(span);
      this.append(markup);
      count++;
    }
  }

  addCheckbox(group, options, label) {
    let checkLabel = document.createElement("label");
    checkLabel.innerHTML = label;
    checkLabel.setAttribute("for", group);
    this.append(checkLabel);

    let count = 0;
    for (let option in options) {
      let span = document.createElement("span");
      span.innerHTML = option;
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = options[option];
      checkbox.name = group + "-" + count;
      checkbox.id = group + "-" + count;

      let markup = document.createElement("label");
      markup.setAttribute("for", group + "-" + count);
      markup.appendChild(checkbox);
      markup.appendChild(span);
      this.append(markup);
      count++;
    }
  }

  validate(inputs) {
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].validity.valid !== true) {
        throw new error("Form data is not valid");
      }
      else {
        return true;
      }
    }
  }

  setAction(action) {
    this.action = action;
  }

  setMethod(method) {
    this.method = method;
  }

  setEventListener(elemId, event, callback) {
    let target = document.getElementById(elemId);
    target.addEventListener(event, callback);
  }

  setupStyles(styles) {
    if (typeof styles !== "object") {
      throw new TypeError("Must be an object");
    } else {
      for (var key in styles) {
        this.style[key] = styles[key];
      }
    }
  }
}

// Define the new element
window.customElements.define("calc-form", CalcForm, { extends: "form" });

