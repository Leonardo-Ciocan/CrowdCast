/**
 * Created by leo on 20/02/2016.
 */

var Header = React.createClass({
    render: function() {

        var style = {
            height:"55px",
            width:"100%",
            position:"fixed",
            background:"#fafafa",
            left: "0px",
            top : "0px",
            right:"0px",
            borderBottom:"1px solid lightgray"

        };

        var centerStyle = {
            position: "absolute",
            left:"50%",
            top:"0px",
            bottom:"0px",
            width:"200px",
            marginLeft:"-100px",
            background:"rgba(0,0,0,0.15)"
        };

        return (
            <div style={style}>
                <div style={centerStyle}>

                </div>
            </div>
        );
    }
});


var Episode = React.createClass({
    render: function() {

        var style = {
            width:"100%",
            background:"#fafafa",
            border:"1px solid lightgray",
            borderRadius:"5px",
            marginTop:"10px"
        };

        return (
            <div style={style}>
                <h1 style={{fontFamily:"Helvetica" , fontWeight:"200", fontSize:"12pt",margin:"10px" ,marginBottom:"5px"}}>Podcast episode title</h1>
                <h3 style={{fontFamily:"Helvetica" , fontWeight:"200", fontSize:"9pt",marginLeft:"10px" ,marginTop:"0px"}}>Episode 1 | 12:33</h3>
            </div>
        );
    }
});

var MainPage = React.createClass({
    render: function() {

        var style = {
            left:"300px",
            top:"0px",
            bottom:"0px",
            right:"0px",
            position:"absolute",
            padding:"10px"
        };

        var leftStyle = {
            width:"280px",
            position:"absolute",
            top:"55px",
            left:"0px",
            background:"#fafafa",
            bottom:"0px",
            padding:"10px",
            borderRight:"1px solid lightgray",
            paddingTop:"10px"
        };

        var items = this.props.items.map((item) => <Episode/>);

        var menuItems = this.props.menuItems.map(
            (item) =>  <h3 style={{ textAlign:"center", fontFamily:"Helvetica" , fontWeight:"200", fontSize:"15pt",marginLeft:"20px" ,marginTop:"30px"}}>{item}</h3>
        );

        return (
                <div>
                    <div style={leftStyle}>
                        <h3 style={{color:"gray" , textAlign:"center", fontFamily:"Helvetica" , fontWeight:"bold", fontSize:"18pt",marginLeft:"10px" ,marginTop:"20px"}}>PODCASTS</h3>

                        {menuItems}
                    </div>
                    <div style={style}>
                        <Header/>
                        <div style={{marginTop:"70px"}}>
                            <h1 style={{fontFamily:"Helvetica" , fontWeight:"200", fontSize:"25pt",margin:"10px" ,marginBottom:"5px"}}>/r/Writing prompt</h1>
                            <h3 style={{fontFamily:"Helvetica" , fontWeight:"200", fontSize:"15pt",marginLeft:"10px" ,marginTop:"0px"}}>128 episodes</h3>
                        </div>

                        {items}
                    </div>


                </div>
        );
    }
});

ReactDOM.render(
    <MainPage items={[1,1,1,1]}  menuItems={["/r/WhatIfHistory" , "/r/creepy" , "/r/SomeSubreddit"]}/>,
    document.getElementById('root')
);