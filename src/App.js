//import logo from './logo.svg';
import React, {useState} from 'react';
import './css/main.css';
import Todo from './components/Todo';
import {List} from '@mui/material';
import AddTodo from "./components/AddTodo";


const App = () => {

    const [itemList,setItemList] = useState ([
        // {
        //     id: 1,
        //     title: '점심메뉴 고르기',
        //     done: true
        // },
        // {
        //     id: 2,
        //     title: '책 읽기',
        //     done: false
        // },
        // {
        //     id: 3,
        //     title: '동영상 강의 보기',
        //     done: false
        // }
   ]);

    //AddTodo에게 전달할 함수
    //할일 추가처리
    const add = (item) =>{
        item.id = itemList.length +1;
        item.done = false;
        // console.log('add 호출됨');
        // console.log(item);

        setItemList(itemList => itemList.concat(item));
        console.log(itemList);
    };

    const remove = (target) => {
        console.log(target);

        const filteredItemList = itemList.filter(item => {
            return target.id !== item.id;
        });
        setItemList(filteredItemList);
    };

    const todoItems = itemList.map(item => <Todo key={item.id} item={item} remove={remove} />);

    useEffect(

    )


    return (
    <div className="wrapper">
        <AddTodo add={add}/>
        <List>
            {todoItems}
        </List>
    </div>
  );

}

export default App;
