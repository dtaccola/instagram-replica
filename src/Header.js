import {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import {auth, storage, db} from './firebase.js';


function Header(props){
    const [progress, setProgress] = useState(0);

    const [file, setFile] = useState(null);

    useEffect(()=>{
        
    }, [])

    function abrirModalCriarConta(e){
        e.preventDefault();

        let modal = document.querySelector(".modalCriarConta");
        modal.style.display = "block";
        
    }

    function criarConta(e){
        e.preventDefault();
        let email = document.getElementById("email-cadastro").value;
        let username = document.getElementById("username-cadastro").value;
        let senha = document.getElementById("senha-cadastro").value;

        auth.createUserWithEmailAndPassword(email, senha)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName: username
            });
            alert("Conta criada");

            let modal = document.querySelector(".modalCriarConta");
            modal.style.display = "none";
        }).catch((error)=>{
            alert(error.message);
        })
        ;
    }

    function logar(e){
        e.preventDefault();
        let email = document.getElementById("email-login").value;
        let senha = document.getElementById("senha-login").value;

        auth.signInWithEmailAndPassword(email, senha)
        .then((auth)=>{
            props.setUser(auth.user.displayName);
            alert("Logado");
        }).catch((error)=>{
            alert(error.message);
        })
        ;
    }

    function abrirModalUpload(e){
        e.preventDefault();

        let modal = document.querySelector(".modalUpload");
        modal.style.display = "block";
    }

    function fecharModalCriar(){
        let modal = document.querySelector(".modalCriarConta");
        modal.style.display = "none";
    }

    function fecharModaUpload(){
        let modal = document.querySelector(".modalUpload");

        modal.style.display = "none";
    } 

    function uploadPost(e){
        e.preventDefault();
        let tituloPost = document.getElementById("titulo-upload").value;
        let progressEl = document.getElementById("progress-upload");

        const uploadTask = storage.ref(`images/${file.name}`).put(file);

        uploadTask.on("state_changed", function(snapshot){
            const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            setProgress(progress);
        }, function(error){

        }, function(){
            storage.ref("images").child(file.name).getDownloadURL()
            .then(function(url){
                db.collection("posts").add({
                    titulo: tituloPost,
                    image: url,
                    username: props.user,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })

                setProgress(0);
                setFile(null);

                alert("Upload realizado com sucesso!");

                document.getElementById("form-upload").reset();
            })
        })
    }

    return(
        <div className="header">
            <div className="modalCriarConta">
                <div className="formCriarConta">
                    <div onClick={()=>fecharModalCriar()} className="close-modal-criar">X</div>
                    <h2>Criar Conta</h2>
                    <form onSubmit={(e)=>criarConta(e)}>
                        <input id="email-cadastro" type="text" placeholder="E-mail" />
                        <input id="username-cadastro" type="text" placeholder="Username" />
                        <input id="senha-cadastro" type="password" placeholder="Senha" />
                        <input type="submit" value="Criar Conta" />
                    </form>
                </div>
            </div>

            <div className="modalUpload">
                <div className="formUpload">
                    <div onClick={()=>fecharModaUpload()} className="close-modal-upload">X</div>
                    <h2>Fazer Upload</h2>
                    <form id="form-upload" onSubmit={(e)=>uploadPost(e)}>
                        <progress id="progress-upload" value={progress}></progress>
                        <input id="titulo-upload" type="text" placeholder="Arquivo" />
                        <input onChange={(e)=>setFile(e.target.files[0])} type="file" name="file" />               
                        <input type="submit" value="Postar" />
                    </form>
                </div>
            </div>

            <div className="center">
                <div className="header_logo">
                    <a href="#"><img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="logo"></img></a>
                </div>
                {
                    (props.user)?
                    <div className="header_logadoInfo">
                        <span>Olá, <b>{props.user}</b></span>
                        <a onClick={(e)=>abrirModalUpload(e)} href="#">Postar</a>
                    </div>
                    :
                    <div className="header_loginForm">
                        <form onSubmit={(e)=>logar(e)} >
                            <input id="email-login" type="text" placeholder="Login" />
                            <input id="senha-login" type="password" placeholder="Senha" />
                            <input type="submit" name="acao" value="Logar!" />
                        </form>
                        <div className="btn_criarConta">
                            <a onClick={(e)=>abrirModalCriarConta(e)} href="#">Criar Conta</a>  
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}


export default Header;

