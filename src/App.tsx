import React, {useEffect, useState} from 'react';
import axios from "axios";
import './App.css';

export type PhotoSizeViewModel= {
    url: string
    width: number
    height: number
    fileSize: number
}

export type TodoListImagesViewModel ={
    main: PhotoSizeViewModel[]
}

export type TodoListViewModel ={
    isImportant: boolean
    id: string
    title: string
    description: string
    addedDate: Date
    order: number
    images: TodoListImagesViewModel
}

export type GetTotdoListResponseType ={
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: TodoListViewModel[]
}

function App() {
    //1.tags-[]
    //6.tags=[{},{},{},{}]// tags from step 5
    const [todolist, setTodolist] = useState<GetTotdoListResponseType|null>(null/*1*/)

    //2 register effect
    useEffect(() => {
        //4.run effect
        console.log("useEffect")
        axios.get<GetTotdoListResponseType>("https://todolists.samuraijs.com/api/1.0/todolists")
            .then(response => {
            console.log(response.data)
            setTodolist(response.data)
        })
    }, [] /*call effect 1 time*/)
    //3.emty rendering
    //7.tags rendering
    console.log("rendering")
    return (
        <div className="App">
            <div>
                {todolist===null
                    ?"loading"
                    :todolist.items.map(el => {
                        const imgesUrl = el.images.main.length > 1 ? el.images.main[1].url : "";
                        return (
                            <div key={el.id}>
                                <img src={imgesUrl} alt=""/>
                                <h3>
                                    {!el.isImportant ? "🔥" : ""}
                                    {/*<input type={"checkbox"} checked={!el.isImpotant}/>*/}
                                    {el.title}</h3>
                                <div>
                                    {el.description}
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    );
}

export default App;
