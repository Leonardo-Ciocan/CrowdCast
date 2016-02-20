/// <reference path='../typing/react.d.ts' />
import React = require('react');
import ReactDOM = require('react-dom');

interface MainPageProps{}

class MainPage extends React.Component<MainPageProps,any>{
    render(){
        return <div>
                     <h1>Hello world</h1>
                </div>
    }
}

ReactDOM.render(MainPage , document.getElementById("root"));