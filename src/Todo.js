import React, { Component } from 'react';
import './todo.css';


class Todo extends Component {
constructor(props){
  super(props);
  this.state = {
    todo: []
  };
  this.addTodo = this.addTodo.bind(this);
  this.fetchResponse = this.fetchResponse.bind(this);
}

// 初期値の設定
componentWillMount(){
  this.fetchResponse();
}

// リストの更新
fetchResponse(){
  fetch("/db.json/")
  .then( res => res.json() )
  .then( res => {
    this.setState({
      todo : res
    });
  })
}
// 新規追加
addTodo() {
  fetch("/db.json/", {
    method: 'POST',
    body: JSON.stringify({
    title: this.refs.newText.value,
    times: new Date().toLocaleString()
    }),
    headers: new Headers({ 'Content-type' : 'application/json' })
  }).then( () => {
    // リストの更新
    this.fetchResponse();
    // 値の初期化
    this.refs.newText.value = "";
  })
}

// 編集機能
updateTodo(todo) {
  fetch("/db.json"+todo.id, {
    method: 'PUT',
    body: JSON.stringify({
      id: todo.id,
      title: todo.title,
      times: todo.times
    }),
    headers: new Headers({ 'Content-type' : 'application/json' })
  }).then(() => {
    // リストの更新
    this.fetchResponse();
  })
}

// 削除機能
deleteTodo(todo) {
  fetch('/db.json'+todo.id, {
    method: 'DELETE'
  }).then( () => {
    const todos = this.state.todo.filter(item => item.id !== todo.id)
    // 保存
    this.setState({
      todo : todos
    });
  })
}

render() {
    return(
      <div className="wrap">
          <h1 className="title">TODOList</h1>
         <form action="./confirm.php" method="post">
          <ul className="task">
            {this.state.todo.map( todo => (
              <li key={todo.id}>
                <input type="text"
                  defaultValue={todo.title}
                  onChange={e => todo.title = e.target.value} name="todo[]" value={todo.title}/>
                <input type="button" value="編集" onClick={() => this.updateTodo(todo)}/>
                <input type="button" value="削除" onClick={() => this.deleteTodo(todo)}/><br/>
                <input className="hide" type="text" name="times[]" value={todo.times}/>
              </li>
            ))}
          </ul>
          <input type="text" ref="newText"/>
          <input type="button" value="追加" onClick={this.addTodo}/>
        <div className="mail_form">
         <h2>メール送信フォーム</h2>
           <p>
             送信先
           </p>
           <input type="text" name="to" />
           <p>
             メールのタイトル
           </p>
           <input type="text" name="title" />
          <div className="Listbox">
           <p>
             本文(TodoList)
           </p>
            <ul className="todolist">{ this.state.todo.map( list => (
            <li key={list.id}>
              {list.id}：{list.title}<br/>
              Time: {list.times}
            </li>
            ))}
            </ul>
          </div>
           <p>
             <input type="submit" name="send" value="送信" />
           </p>
          </div>
         </form>
      </div>
    );}
  }

export default Todo;
