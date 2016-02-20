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

        return (
            <div style={style}>

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
                    <h1 style={{fontFamily:"Helvetica" , fontWeight:"200", fontSize:"12pt",margin:"10px" ,marginBottom:"5px"}}>Episode 1</h1>
                    <h3 style={{fontFamily:"Helvetica" , fontWeight:"200", fontSize:"9pt",marginLeft:"10px" ,marginTop:"0px"}}>Episode 1 | 12:33</h3>
            </div>
        );
    }
});


var MainPage = React.createClass({
    render: function() {

        var style = {


        };

        var items = this.props.items.map((item) => <Episode/>);

        return (
            <div style={style}>
                <Header/>
                <div style={{marginTop:"80px"}}>
                    <h1 style={{fontFamily:"Helvetica" , fontWeight:"200", fontSize:"25pt",margin:"10px" ,marginBottom:"5px"}}>/r/Writing prompt</h1>
                    <h3 style={{fontFamily:"Helvetica" , fontWeight:"200", fontSize:"15pt",marginLeft:"10px" ,marginTop:"0px"}}>128 episodes</h3>
                </div>

                {items}
            </div>
        );
    }
});

console.log("hellp");

ReactDOM.render(
    <MainPage items={[1,1,1,1]}/>,
    document.getElementById('root')
);