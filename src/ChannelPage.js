import React, { Component } from "react";
import { connect } from "react-redux";
//import MsgRow from "./MsgRow";
import { fetchMsgs } from "./redux/actions";
import MsgForm from "./MsgForm";
//import {alert}

class ChannelPage extends Component {
  componentDidMount() {
    this.interval = setInterval(
      () => this.props.fetchMsgs(this.props.match.params.channelID),
      1000
    );
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.channelID !== prevProps.match.params.channelID
    ) {
      //this.setState({changed :true})
      //Clearing the interval should happen here not in the else
      //setting the new interval when the id is changing should happen here
      this.props.fetchMsgs(this.props.match.params.channelID);
    } else {
      clearInterval(this.interval);
      this.interval = setInterval(
        () => this.props.fetchMsgs(this.props.match.params.channelID),
        1000
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  FetchImage() {
    const found = this.props.channels.find(channel => {
      if (channel.id == this.props.match.params.channelID) {
        console.log("chanel!!!", channel.name);
        return channel.name;
        //return found;
      }
    });
    if (found) {
      return found.image_url;
    }
    return "";
    //console.log("hiiiiiiii");
    //console.log("Found!!!", found);
  }
  //   myFunction() {
  //     setInterval(() => fetchMsgs(this.props.match.params.channelID), 1000);
  //   }
  render() {
    // const channel = this.props.channel;
    // const found = this.props.channels.find(function(channel) {
    //   return channel == this.match.params.channelID;
    // });
    // console.log("hi", found);
    //const myVar;

    //console.log("alert!!!!!!!!!!!!!!!!!!!", myFunction());
    // function alertFunc() {
    //   alert("Hello!");
    // }
    //console.log("alert!!!", va);
    //console.log("channel ID", this.props.match.params.channelID);
    let image_url = this.FetchImage();
    console.log("name!!", image_url);

    return (
      <div
        style={{
          backgroundImage: `url(${image_url} )`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          padding: "3%"
        }}
        // className="img-fluid"
      >
        <div>
          {/* <div
            className="alert alert-primary"
            role="alert"
            style={{
              paddingTop: "5px"
            }}
          >
            <h1>Welcome to our Chat Page ...</h1>
          </div> */}

          {this.props.msgs.map(msg => {
            return (
              <div
                // className="alert alert-light"
                className="alert alert-secondary"
                role="alert"
                style={{
                  paddingTop: "5px",
                  borderRadius: "35px"
                }}
              >
                <p>
                  <p className="rounded float-left">
                    {msg.username}
                    <strong> : {msg.message}</strong>
                  </p>
                  <small class="rounded float-right">{msg.timestamp}</small>
                </p>
              </div>
            );
          })}

          <div>
            <MsgForm channelID={this.props.match.params.channelID} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    msgs: state.channelroot.msgs,
    channels: state.channelroot.channels
  };
};
const mapDispatchToProps = dispatch => ({
  fetchMsgs: channelID => dispatch(fetchMsgs(channelID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelPage);
