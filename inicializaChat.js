import { FunctionDeclarationSchemaType, GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyAPnws2rLCPxnlh658n1a9b2yRQb7lYyt4');

const funcoes = {
  taxaJurosParcelamento: ({ value }) => {
    const meses = typeof value === "string" ? parseInt(value) : value;
    if (meses <= 6) {
      return 3;
    } else if (meses <= 12) {
      return 5;
    } else if (meses <= 24) {
      return 7;
    }
  }
};

const tools = [
  {
    functionDeclarations: [
      {
        name: "taxaJurosParcelamento",
        description: "Retorna a taxa de juros para parcelamento baseado na quantidade de meses",
        parameters: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            value: { type: FunctionDeclarationSchemaType.NUMBER },
          },
          required: ["value"],
        } 
      }
    ]
  }
];


const model = genAI.getGenerativeModel(
  { model: "gemini-1.0-pro-latest"}
);

let chat;

function inicializaChat() {
  chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: `Você é Jess, uma chatbot amigável que representa 
        a empresa Jornada Viagens, que perfila os clientes com base em suas respostas, 
        de modo a vender pacotes turísticos personalizados destinos nacionais e
        internacionais, tanto para países quanto para cidades. Você pode responder
        qualquer coisa relativo a esse contexto `}],
      },
      {
        role: "model",
        parts: [{ text: `Olá! Obrigado por entrar em contato com o Jornada Viagens. 
        Antes de começar a responder sobre suas dúvidas, preciso do seu nome e 
        endereço de e-mail.` }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });
}

export { chat, funcoes, inicializaChat };
