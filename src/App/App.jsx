/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
import ReactIframe from 'react-iframe'
import './App.css'
import swal from 'sweetalert'
export default function App() {
    const [dogName, setDogName] = useState("affenpinscher")
    const [dogImage, setImageDog] = useState("")
    const [capitalizeDogName, setCapitalizeDogName] = useState("")
    const inputDogs = useRef()
    const select = useRef()

    useEffect(() => {
        changeInputHandler()
        capDogNameHandle()
    }, [dogName])

    useEffect(() => {
        createOption()
        changeInputHandler()
        capDogNameHandle()
    }, [])

    function changeSelectHandle() {
        inputDogs.current.value = String(select.current.value)
        setDogName(String(select.current.value).toLowerCase())
    }

    function capDogNameHandle() {
        const mySentence = dogName;
        const words = mySentence.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        setCapitalizeDogName(words)
    }

    async function createOption() {
        const Fetch = await fetch(`https://dog.ceo/api/breeds/list/all`)
        const Json = await Fetch.json()
        if (Fetch.status === 200) {
            Array.from(Object.entries(Object.entries(Json)[0][1])).forEach((x) => {

                select.current.insertAdjacentHTML("afterbegin", `<option value=${x[0]}>${x[0]}</option>`)
            })
        }


    }

    async function changeInputHandler() {
        const Fetch = await fetch(`https://dog.ceo/api/breed/${dogName}/images/random`)
        const Json = await Fetch.json()

        if (Fetch.status === 200 && inputDogs.current.value) {
            select.current.value = inputDogs.current.value.toLowerCase()
            setImageDog(Json?.message)
            setDogName(String(inputDogs.current.value).toLowerCase())

        }
        else if (Fetch.status === 200 && !inputDogs.current.value) {
            inputDogs.current.value = "Affenpinscher"
            select.current.value = "affenpinscher"
            setDogName("affenpinscher")
        }
        else {
            swal({
                title: "The Dog Breed Not Found !",
                buttons: "Try Again",
                icon: "error"
            }).then((res) => {
                inputDogs.current.value = "Affenpinscher";
                setDogName("affenpinscher")
            })
        }
    }

    return (
        <section className='App'>
            <div className='App__Search_Handle'>
                <input ref={inputDogs} type="text" className='DogInputSearch' placeholder='Enter Your Dogs Breed ...' onBlur={changeInputHandler} />
                <select className='DogSelectBreed' ref={select} onChange={changeSelectHandle}></select>
            </div>
            <h1 className='App__Show_Dog_Name'>{capitalizeDogName}</h1>
            <div className='App__Dog_Details_Box'>
                <div style={{ backgroundImage: `url(${dogImage})` }} alt="" className="App__Dog_Details_Box__Dog_Image" />
                <iframe src={`https://www.google.com/search?q=${dogName}:Dog Breed&sca_esv=7de4e3da6f1aa72e&igu=1`}></iframe>
            </div>
        </section>
    )
}
