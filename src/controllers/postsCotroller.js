import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js"
import fs from "fs";


export async function listarPosts(req, res){
    const posts = await getTodosPosts();
    res.status(200).json(posts);
};

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postcriado = await criarPost(novoPost);
        res.status(201).json(postcriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requiseção"});
    }
}
export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl:req.file.originalname,
        alt: ""
    }
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada =`uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(201).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requiseção"});
    }
}

export async function atualizarNovoPosto(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`

   
    try {
        const imagemBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imagemBuffer);

        const post = {
            imgUrl:urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postcriado = await atualizarPost(id, post);
        res.status(201).json(postcriado);

    } catch (error) {

        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requiseção"});
    }
}
