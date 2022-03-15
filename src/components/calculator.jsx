import React, { useState } from "react";
import "./calculator.css";

export default function Calculator() {
  //Estados necessários para a aplicação
  const [num, setNum] = useState(0);
  const [operator, setOperator] = useState(null);
  const [base, setBase] = useState(8);
  const [resultado, setResultado] = useState(0);
  const [disableNumericalBase, setDisableNumericalBase] = useState(true);
  const [disableOperation, setDisableOperation] = useState(false);

  //Função para acresentar um número ao "visor" da calculadora
  function inputNum(e) {
    if (num === 0) setNum(e.target.value);
    else setNum(num + e.target.value);
  }

  //Função para resetar a calculadora
  function clear(e) {
    setResultado(0);
    setNum(0);
    setOperator(null);
    setBase(8);
    setDisableNumericalBase(true);
    setDisableOperation(false);
  }

  //Função para determinar qual foi a operação selecionada
  function operatorHandle(e) {
    if (num != 0) {
      setOperator(e.target.value);
      setResultado(num);
      setNum(0);
    }
  }

  //Função para fazer os calculos com os números na base 8 (octal)
  function calculate() {
    if (operator === "+") {
      setNum((parseInt(resultado, 8) + parseInt(num, 8)).toString(8));
      setResultado(parseInt(resultado, 8) + parseInt(num, 8));
      setDisableNumericalBase(false);
      setDisableOperation(true);
    }
    if (operator === "-") {
      setNum((parseInt(resultado, 8) - parseInt(num, 8)).toString(8));
      setResultado(parseInt(resultado, 8) + parseInt(num, 8));
      setDisableNumericalBase(false);
      setDisableOperation(true);
    }
    if (operator === "x") {
      setNum((parseInt(resultado, 8) * parseInt(num, 8)).toString(8));
      setResultado(parseInt(resultado, 8) + parseInt(num, 8));
      setDisableNumericalBase(false);
      setDisableOperation(true);
    }
    if (operator === "/") {
      setNum((parseInt(resultado, 8) / parseInt(num, 8)).toString(8));
      setResultado(parseInt(resultado, 8) + parseInt(num, 8));
      setDisableNumericalBase(false);
      setDisableOperation(true);
    }
  }

  //Função para converter o número para octal
  function toOctal(input) {
    setNum(parseInt(num, base).toString(8));
    setBase(input);
  }
  //Função para converter o número para decimal
  function toDecimal(input) {
    setNum(parseInt(num, base).toString(10));
    setBase(input);
  }
  //Função para converter o número para binário
  function toBinary(input) {
    setNum(parseInt(num, base).toString(2));
    setBase(input);
  }

  //Função para enviar a mensagem através da API
  function sendMessage() {
    var phone = window.prompt(
      "Digite o número de telefone para enviar o resultado",
      ""
    );
    if (phone) {
      const Url = `https://wapi.appclientefiel.com.br/rest/comum/EnviarWhats/${phone}/Calculadora/${resultado.toString(
        base
      )}`;
      fetch(Url).then((data) => {
        if (data.ok) window.alert("Mensagem enviada com sucesso!");
        else window.alert("Erro ao enviar a mensagem");
      });
    }
  }

  // Calculadora
  return (
    <div id="backgroud-calculator" className="container-sm p-3">
      {/* Botões para mudar o tipo de visualização do número */}
      <div className="numeralSystem">
        <button
          type="button"
          className={`button-numeralSystem ${base == 8 ? "select" : ""}`}
          disabled={disableNumericalBase}
          onClick={() => toOctal(8)}
        >
          Octal
        </button>
        <button
          type="button"
          className={`button-numeralSystem ${base == 10 ? "select" : ""}`}
          disabled={disableNumericalBase}
          onClick={() => toDecimal(10)}
        >
          Decimal
        </button>
        <button
          type="button"
          className={`button-numeralSystem ${base == 2 ? "select" : ""}`}
          disabled={disableNumericalBase}
          onClick={() => toBinary(2)}
        >
          Binário
        </button>
      </div>
      {/* "Visor" da calculadora */}
      <h1 className="result">{num}</h1>
      {/* Botões da calculadora + Botão enviar resultado */}
      <button type="button" className="button-symbol" onClick={clear}>AC</button>
      <button type="button" className="button-number" onClick={inputNum} disabled={disableOperation} value={0}>0</button>
      <button type="button" className="button-number" onClick={inputNum} disabled={disableOperation} value={1}>1</button>
      <button type="button" className="button-number" onClick={inputNum} disabled={disableOperation} value={2}>2</button>
      <button type="button" className="button-number" onClick={inputNum} disabled={disableOperation} value={3}>3</button>
      <button type="button" className="button-number" onClick={inputNum} disabled={disableOperation} value={4}>4</button>
      <button type="button" className="button-number" onClick={inputNum} disabled={disableOperation} value={5}>5</button>
      <button type="button" className="button-number" onClick={inputNum} disabled={disableOperation} value={6}>6</button>
      <button type="button" className="button-number" onClick={inputNum} disabled={disableOperation} value={7}>7</button>
      <button type="button" className="button-symbol" onClick={operatorHandle} disabled={operator!=null} value={"+"}>+</button>
      <button type="button" className="button-symbol" onClick={operatorHandle} disabled={operator!=null} value={"-"}>-</button>
      <button type="button" className="button-symbol" onClick={operatorHandle} disabled={operator!=null} value={"/"}>/</button>
      <button type="button" className="button-symbol" onClick={operatorHandle} disabled={operator!=null} value={"x"}>x</button>
      <button type="button" className="button-symbol" onClick={calculate} disabled={disableOperation} value={"="}>=</button>
      <button type="button" className="button-send" disabled={disableNumericalBase} onClick={sendMessage}>Enviar resultado</button>
    </div>
  );
}
