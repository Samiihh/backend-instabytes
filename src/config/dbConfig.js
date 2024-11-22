
import { MongoClient } from "mongodb";


export default async function connectaraoBanco(stringConexao) {
  let mongoCliente;

  try {
    mongoCliente = new MongoClient(stringConexao);
    console.log("conectando ao cluster do banco de dados...");
    await mongoCliente.connect();
    console.log("conectado ao MongoDB Atlas com sucesso!");

    return mongoCliente;
  } catch (erro) {
    console.error("Falha ao conectar ao banco de dados:", erro);
    process.exit();
  }
}
