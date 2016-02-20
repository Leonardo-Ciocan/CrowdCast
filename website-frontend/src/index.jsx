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
            width:"350px",
            marginLeft:"-175px",
            background:"rgba(0,0,0,0.06)",
            borderLeft:"1px solid lightgray",
            borderRight:"1px solid lightgray"
        };

        var progress = {
            position:"absolute",
            left:"0px",
            right:"88px",
            bottom:"0px",
            height:"4px",
            background:this.props.color,
            borderRight:"1px solid rgba(0,0,0,0.07)"
        };

        var nameStyle = {
          position:"absolute",
            right:"10px",
            top:"0px",
            lineHeight:"55px",
            verticalAlign:"middle", fontFamily:"Helvetica" ,
            fontWeight:"200", fontSize:"12pt",
            margin:"0px"

        };

        return (
            <div style={style}>
                <h1 style={nameStyle}>Leonardo Ciocan</h1>

                <div style={centerStyle}>
                    <div style={progress}></div>

                    <h1 style={{textAlign:"center", fontFamily:"Helvetica" , fontWeight:"200", fontSize:"12pt",margin:"10px" ,marginBottom:"5px"}}>Current episode</h1>
                    <h3 style={{textAlign:"center", fontFamily:"Helvetica" , fontWeight:"200", fontSize:"9pt",marginLeft:"10px" ,marginTop:"0px"}}>05:00 / 12:33</h3>
                </div>
            </div>
        );
    }
});


var Episode = React.createClass({
    render: function() {

        var style = {
            width:"100%",
            height:"45px",
            background:"#fafafa",
            border:"1px solid lightgray",
            borderRadius:"5px",
            marginTop:"10px",
            position:"relative"
            ,cursor:"pointer",
            opacity : this.props.index-1 < 4 ? "0.5" : "1"
        };

        return (
            <div style={style}>

                <h1 style={{display:"inline-block",lineHeight:"45px",margin:"0px",verticalAlign:"middle",fontFamily:"Helvetica" , fontWeight:"200" ,whiteSpace:"nowrap",overflow:"hidden" , textOverflow:"ellipsis", fontSize:"9pt",position:"absolute",top:"0px",left:"100px",right:"50px",textAlign:"center"}}>{this.props.name}</h1>
                <h1 style={{color:this.props.color , borderLeft:"1px solid lightgray",paddingLeft:"10px",paddingRight:"10px",display:"inline-block",position:"absolute",right:"0px",lineHeight:"45px",margin:"0px",verticalAlign:"middle",fontFamily:"Helvetica" , fontWeight:"200", fontSize:"12pt"}}>▶</h1>
                <h3 style={{background:"rgba(0,0,0,0.015)",textAlign:"center",width:"80px",borderRight:"1px solid lightgray",display:"inline-block",lineHeight:"22px",margin:"0px",verticalAlign:"middle",position:"absolute" , top:"0px",left:"0px" , bottom:"50%",fontFamily:"Helvetica" , fontWeight:"200", fontSize:"9pt",paddingLeft:"10px" ,marginTop:"0px"}}>Episode {this.props.index}</h3>
                <h3 style={{background:"rgba(0,0,0,0.015)",textAlign:"center",width:"80px",borderRight:"1px solid lightgray",display:"inline-block",lineHeight:"22px",margin:"0px",verticalAlign:"middle",position:"absolute" , top:"50%",left:"0px" , bottom:"0px",fontFamily:"Helvetica" , fontWeight:"200", fontSize:"9pt",paddingLeft:"10px" ,marginTop:"0px"}}>12:33</h3>

            </div>
        );
    }
});

var MainPage = React.createClass({
    getInitialState:function(){
      return {items : this.props.items , selected : [0,0]}
    },
    render: function() {

        var style = {
            left:"300px",
            top:"0px",
            bottom:"0px",
            right:"0px",
            position:"absolute",
            padding:"20px"
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

        var items = (this.state.items || this.props.items).map((item,index) => <Episode index={index+1} name={item} color={this.props.color}/>);

        var menuItems = this.props.menuItems.map(
            (itemX , indexX) => {
                var subitems = itemX.data.map((item, index) => {
                    return <h3
                        onClick={function(){this.setState({selected:[index,indexX]});this.changeSubreddit(item)}.bind(this)}
                        style={{cursor:"pointer", color: index == this.state.selected[0] && this.state.selected[1] == indexX ? this.props.color :"black", textAlign:"center", fontFamily:"Helvetica" , fontWeight:"200", fontSize:"12pt",marginLeft:"20px" ,marginTop:"30px"}}>{item}</h3>;
                });

                return <div style={{borderTop:"1px solid lightgray"}}>
                    <h3 style={{cursor:"pointer" ,color:"gray", textAlign:"center", fontFamily:"Helvetica" , fontWeight:"bold", fontSize:"14pt",marginLeft:"20px" ,marginTop:"30px"}}>{itemX.name}</h3>
                    {subitems}
                </div>
            }
        );

        return (
                <div>
                    <div style={leftStyle}>
                        <h3 style={{color:"gray" , textAlign:"center", fontFamily:"Helvetica" , fontWeight:"bold", fontSize:"18pt",marginLeft:"10px" ,marginTop:"20px"}}>PODCASTS</h3>

                        {menuItems}
                    </div>
                    <div style={style}>
                        <Header color={this.props.color}/>
                        <div style={{marginTop:"60px"}}>
                            <h1 style={{textAlign:"center", fontFamily:"Helvetica" , fontWeight:"200", fontSize:"25pt",margin:"10px" ,marginBottom:"5px"}}>{this.props.menuItems[this.state.selected[1]].data[this.state.selected[0]]}</h1>
                            <h3 style={{textAlign:"center",fontFamily:"Helvetica" , fontWeight:"200", fontSize:"15pt",marginLeft:"10px" ,marginTop:"0px"}}>{this.props.items.length} episodes</h3>
                        </div>

                        {items}
                    </div>


                </div>
        );
    }
    ,
    changeSubreddit(newSubrredit){
        $.get("https://www.reddit.com/r/"+newSubrredit+"/top.json?sort=top&t=all&limit=15" , function(data){
            names = data.data.children.map(function(child){
                return child.data.title;
            });



            this.setState({items : names})
        }.bind(this));
    }
});


var url ="https://www.reddit.com/r/WritingPrompts/top.json?limit=15";

var names = [];
$.get(url , function(data){
    names = data.data.children.map(function(child){

        return child.data.title;
    });


    ReactDOM.render(
        <MainPage color="dodgerblue" items={names}  menuItems={[{name:"REDDIT",data:["WritingPrompts","HistoryWhatIf" , "creepy" , "nosleep" , "shittyaskreddit"]} ,
                {name:"TECH" , data:["The Verge" , "Hacker News" , "FB Developer blog"]}]}/>,
        document.getElementById('root')
    );
});
