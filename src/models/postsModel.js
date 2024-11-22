import "dotenv/config";

import { ObjectId } from "mongodb";
import connectaraoBanco from "../config/dbConfig.js";

const conexao = await connectaraoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
  const db = conexao.db("imersao-instabyte");
  const clecao = db.collection("posta");
  return clecao.find().toArray();
}


export async function criarPost(novoPost) {
  const db = conexao.db("imersao-instabyte");
  const colecao = db.collection("posta");
  return colecao.insertOne(novoPost)  
}


export async function atualizarPost(id,novoPost) {
  const db = conexao.db("imersao-instabyte");
  const colecao = db.collection("posta");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost})
  
}