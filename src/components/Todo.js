import React ,{useState, useEffect} from 'react';

//https://mui.com/material-ui/getting-started/learn/
import {ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";


const Todo = ({item , remove, update}) => {

    const [itemState, setItemState] = useState(item);

    let {id, title, finish}= itemState;
    console.log('itemState:', itemState);

    const removeHandler = e =>{
        // console.log(props.item) ;
        remove(item);
    };

    //체크박스 이벤트 핸들러
    const checkHandler = e =>{
        setItemState({...itemState, finish: !itemState.finish});
        console.log("체크박스 버튼 누름 ");
       //console.log(itemState.id);
    };


    useEffect(() => {
        update(itemState);
    }, [itemState])

    return (
        <ListItem>
            <Checkbox checked={finish} onChange={checkHandler} />
            <ListItemText>
                <InputBase
                    inputProps={{"aria-label" : "naked"}}
                    type="text"
                    id={id}
                    name={id}
                    value={title}
                    multiline={true}
                    fullWidth={true}
                />
            </ListItemText>
            {/* 삭제 버튼 */}
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete Todo" onClick={removeHandler}>
                    <DeleteOutline/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Todo;