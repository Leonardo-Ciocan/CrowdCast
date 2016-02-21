/**
 * Created by leo on 20/02/2016.
 */
function pad2(number) {

    return (number < 10 ? '0' : '') + number

}

var Header = React.createClass({
    getInitialState(){
      return {percentage:0 , current:"" , duration : "" , title:""};
    },
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
            background:"rgba(0,0,0,0.03)",
            borderLeft:"1px solid lightgray",
            borderRight:"1px solid lightgray"
        };

        var progress = {
            position:"absolute",
            left:"2px",
            right:(348-(346 * this.state.percentage)) + "px",
            bottom:"2px",
            height:"4px",
            background:this.props.color,
            borderRadius:"5px",
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

                    <h1 style={{textAlign:"center", fontFamily:"Helvetica" , fontWeight:"200",
                     fontSize:"12pt",margin:"10px" ,marginBottom:"5px"}}>{this.state.title}</h1>
                    <h3 style={{textAlign:"center", fontFamily:"Helvetica" , fontWeight:"200",
                     fontSize:"9pt",marginLeft:"10px" ,marginTop:"0px"}}>{this.state.current} / {this.state.duration}</h3>
                </div>
            </div>
        );
    },
    componentDidMount(){
        window.percentageChanged = function(current,duration){
          this.setState({percentage : current/duration , current: pad2(Math.floor(current/60)) + ":" + pad2(Math.floor(current % 60))
                        , duration: pad2(Math.floor(duration/60)) + ":" + pad2(Math.floor(duration % 60))
              ,title:window.subreddit + " • " + window.episode
          });
        }.bind(this);
    }
});


var Episode = React.createClass({
    getInitialState : function(){
      return {hovering:false}
    },
    render: function() {

        var style = {
            width:"100%",
            height:"45px",
            background:this.state.hovering ? this.props.color : "#fafafa",
            border:"1px solid " + (this.state.hovering ? this.props.color : "lightgray"),
            borderRadius:"5px",
            marginTop:"10px",
            marginLeft:this.state.hovering? "5px" : "0px",
            position:"relative"
            ,cursor:"pointer",
            transition: "margin-left 0.15s"
        };

        return (
            <div onClick={this.itemClicked} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} style={style}>

                <h1 style={{color:(this.state.hovering ? "white" : "black"),display:"inline-block",lineHeight:"45px",margin:"0px",verticalAlign:"middle",fontFamily:"Helvetica" , fontWeight:"200" ,whiteSpace:"nowrap",overflow:"hidden" , textOverflow:"ellipsis", fontSize:"9pt",position:"absolute",top:"0px",left:"100px",right:"50px",textAlign:"center"}}>{this.props.name}</h1>
                <h1 onClick={this.play} style={{color: (!this.state.hovering ? this.props.color : "white") , borderLeft:"1px solid lightgray",paddingLeft:"10px",paddingRight:"10px",display:"inline-block",position:"absolute",right:"0px",lineHeight:"45px",margin:"0px",verticalAlign:"middle",fontFamily:"Helvetica" , fontWeight:"200", fontSize:"12pt"}}>▶</h1>
                <h3 style={{color:(this.state.hovering ? "white" : "gray"), background:"rgba(0,0,0,0.015)",textAlign:"center",width:"80px",borderRight:"1px solid "+ (this.state.hovering ? "white" : "lightgray"),display:"inline-block",lineHeight:"45px",margin:"0px",verticalAlign:"middle",position:"absolute" , top:"0px",left:"0px" , bottom:"50%",fontFamily:"Helvetica" , fontWeight:"200", fontSize:"9pt",paddingLeft:"10px" ,marginTop:"0px"}}>Episode {this.props.index}</h3>

            </div>
        );
    },
    play(){
        var xurl = "http://52.49.190.175:8080/episode/" + this.props.url.replace(/\//g, '').replace("https://" , "");

        $.ajax({
            method:"GET",
            url: xurl,
            dataType: 'JSON',
            type: 'GET',
            success:function(data){
                var url = "http://52.49.190.175:8080/episodes/" + data.episodeFile;
                if(window.audio == undefined) window.audio = new Audio();
                //window.audio.preload = "none";
                window.audio.src = url;
                //window.audio.load();
                window.audio.addEventListener('loadedmetadata', function() {
                    console.log(window.audio.duration);

                    window.audio.addEventListener("timeupdate" ,
                        function(data){
                            //console.log(window.audio.duration);
                            window.percentageChanged(window.audio.currentTime , window.audio.duration);
                        });
                    window.audio.play();
                });
            }

        });

        this.props.onPlay(this.props.text);
        window.episode = "Episode " + this.props.index;

    },
    mouseEnter:function(){
        this.setState({hovering:true});
    },
    mouseLeave:function(){
        this.setState({hovering:false});
    },
    itemClicked : function(){
        this.props.clicked(this.props.index);
    }
});

var MainPage = React.createClass({
    getInitialState:function(){
      return {items : this.props.items , selected : [0,0] , text:"" , comments:[]}
    },
    render: function() {

        var style = {
            left:"300px",
            top:"0px",
            bottom:"0px",
            right:"420px",
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

        var rightStyle = {
            width:"400px",
            position:"absolute",
            top:"55px",
            right:"0px",
            background:"#fafafa",
            bottom:"0px",
            padding:"10px",
            borderLeft:"1px solid lightgray",
            paddingTop:"10px"
        };

        var items = (this.state.items || this.props.items).map((item,index) => <Episode clicked={this.episodeClicked} onPlay={this.onPlay} index={index+1} name={item.title} url={item.url} text={item.text} color={this.props.color}/>);

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

        var comments = this.state.comments.map(
            (comment)=>{
                console.log(comment.html);
                return comment.html == undefined? <div></div> : <div dangerouslySetInnerHTML={{__html:comment.html.replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "'")}}>
                       </div>
            }
        );

        console.log(comments);

        return (
                <div>
                    <div style={leftStyle}>
                        <h3 style={{color:"gray" , textAlign:"center", fontFamily:"Helvetica" , fontWeight:"bold",
                         fontSize:"18pt",marginLeft:"10px" ,marginTop:"20px"}}>PODCASTS</h3>

                        {menuItems}
                    </div>

                    <div style={rightStyle}>
                        <h3 style={{color:"gray" , textAlign:"center", fontFamily:"Helvetica" ,
                        fontWeight:"bold", fontSize:"18pt",marginLeft:"10px" ,marginTop:"20px"}}>PREVIEW</h3>
                        {comments}
                    </div>
                    <div style={style}>
                        <Header color={this.props.color}/>
                        <div style={{marginTop:"60px"}}>
                            <h1 style={{textAlign:"center", fontFamily:"Helvetica" , fontWeight:"200",
                            fontSize:"25pt",margin:"10px" ,marginBottom:"5px"}}>{this.props.menuItems[this.state.selected[1]].data[this.state.selected[0]]}</h1>

                            <h3 style={{textAlign:"center",fontFamily:"Helvetica" , fontWeight:"200",
                             fontSize:"15pt",marginLeft:"10px" ,marginTop:"0px"}}>{this.props.items.length} episodes</h3>
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
                return {title:child.data.title , url:child.data.url , text : child.data.selftext};
            });


            window.subreddit = newSubrredit;
            this.setState({items : names})
        }.bind(this));
    },
    onPlay(item){
        console.log(item);
        this.setState({text:item});
    },
    episodeClicked(index){
        console.log("getting " + index);
        $.get(
            this.props.items[index].url + ".json",
            function(data){
                var children = (data[1].data.children.map((child) =>{return {html:child.data.body_html , url:"https://www.reddit.com/api/info.json?id=t1_" + child.data.id};}));
                this.setState({comments:children});
            }.bind(this)
        );
    }
});


var url ="https://www.reddit.com/r/WritingPrompts/top.json?sort=top&t=all&limit=15";

var names = [];
$.get(url , function(data){
    names = data.data.children.map(function(child){
        return {title:child.data.title , url:child.data.url , text : child.data.selftext};
    });


    ReactDOM.render(
        <MainPage color="dodgerblue" items={names}  menuItems={[{name:"REDDIT",data:["WritingPrompts","HistoryWhatIf" , "creepy" , "nosleep" , "shittyaskreddit"]} ,
                {name:"TECH" , data:["The Verge" , "Hacker News" , "FB Developer blog"]}]}/>,
        document.getElementById('root')
    );
});
