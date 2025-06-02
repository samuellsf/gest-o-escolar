window.onload = () => {
  const input = document.getElementById("pergunta");
  const btnEnviar = document.getElementById("enviarPergunta");
  const btnFalar = document.getElementById("falar");

  btnEnviar.addEventListener("click", responderPergunta);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") responderPergunta();
  });

  btnFalar.addEventListener("click", ativarReconhecimentoVoz);

  carregarHistorico();
};

function adicionarMensagem(texto, tipo) {
  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.className = `mensagem ${tipo}`;
  msg.textContent = texto;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;

  salvarHistorico(texto, tipo);
}

function responderPergunta() {
  const pergunta = document.getElementById("pergunta").value.trim();
  if (pergunta === "") return;

  adicionarMensagem(pergunta, "usuario");

  const p = pergunta.toLowerCase();
  let resposta = respostasEducacionais(p);

  adicionarMensagem(resposta, "chatbot");
  document.getElementById("pergunta").value = "";
}

function respostasEducacionais(p) {
  if (p.includes("horário")) return "As aulas começam às 7h30 e vão até 17h.";
  if (p.includes("matrícula")) return "As matrículas estão abertas de 01 a 10 de fevereiro.";
  if (p.includes("boletim") || p.includes("nota")) return "Você pode acessar seu boletim na seção 'Controle Acadêmico'.";
  if (p.includes("professor")) return "Veja os professores na aba 'Professores Acadêmico'.";
  if (p.includes("feriado")) return "Consulte o calendário escolar na aba 'Agenda e Calendário'.";
  if (p.includes("evento")) return "Veja os eventos em 'Eventos Acadêmicos'.";
  if (p.includes("biblioteca")) return "A biblioteca abre das 8h às 16h.";
  if (p.includes("uniforme")) return "O uso de uniforme é obrigatório.";
  if (p.includes("merenda")) return "A merenda é servida nos intervalos.";
  return "Desculpe, ainda não sei responder isso. Tente perguntar de outra forma.";
}

function salvarHistorico(texto, tipo) {
  const historico = JSON.parse(localStorage.getItem("chatHistorico") || "[]");
  historico.push({ texto, tipo });
  localStorage.setItem("chatHistorico", JSON.stringify(historico));
}

function carregarHistorico() {
  const historico = JSON.parse(localStorage.getItem("chatHistorico") || "[]");
  historico.forEach(msg => adicionarMensagem(msg.texto, msg.tipo));
}

function ativarReconhecimentoVoz() {
  const reconhecimento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  reconhecimento.lang = "pt-BR";
  reconhecimento.start();

  reconhecimento.onresult = event => {
    const resultado = event.results[0][0].transcript;
    document.getElementById("pergunta").value = resultado;
    responderPergunta();
  };

  reconhecimento.onerror = () => {
    alert("Não foi possível ativar o reconhecimento de voz.");
  };
}
