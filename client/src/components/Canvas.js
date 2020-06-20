import React, { Component } from 'react';
import { SketchPad, TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE } from 'react-sketchpad';
import IO from 'socket.io-client'

const wsClient = IO(':3001');

export  class Canvas extends Component
{
  socket = null;

  constructor(props) {
    super(props);

    this.state = {
      tool:TOOL_PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      items: []
    }
  }

  componentDidMount() {
    wsClient.on('addItem', item => this.setState({items: this.state.items.concat([item])}));
  }

  render() {
    const { tool, size, color, fill, fillColor, items } = this.state;
    return (
      <div>
        <h3>My Meeting</h3>
        <div style={{float:'left', marginRight:20}}>
          <SketchPad
            width={800}
            height={800}
            animate={true}
            size={size}
            color={color}
            fillColor={fill ? fillColor : ''}
            items={items}
            tool={tool}
            onCompleteItem={(i) => wsClient.emit('addItem', i)}
          />
        </div>
        <div style={{float:'left'}}>
          <div className="options" style={{marginBottom:20}}>
            <label htmlFor="">size: </label>
            <input min="1" max="20" type="range" value={size} onChange={(e) => this.setState({size: parseInt(e.target.value)})} />
          </div>
          <div className="options" style={{marginBottom:20}}>
            <label htmlFor="">color: </label>
            <input type="color" value={color} onChange={(e) => this.setState({color: e.target.value})} />
          </div>
        </div>
      </div>
    );
  }
}