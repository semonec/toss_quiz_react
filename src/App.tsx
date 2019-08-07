import React, { Component } from 'react';
import './App.css';
import { string } from 'prop-types';
import axios, { AxiosRequestConfig } from 'axios';

export interface AppState {
  text?: string,
  result?: never[],
};

export class App extends Component<{}, AppState> {
  constructor(props: AppState) {
    super(props);
    // this.query.bind(this);
    // this.changeText.bind(this);
    this.state = {text: "", result: []};
  }

  private changeText(e: any) {
    this.setState({
      text: e.target.value,
    });
  }

  private query() {
    const config: AxiosRequestConfig = {
      headers: {
        'X-Naver-Client-Id': 'QfWUBuPQLRV5IUFcNJ9l',
        'X-Naver-Client-Secret': 'G130WKaANl',
      },
    };
    axios.get(`/v1/search/news.json?query=${this.state.text}`, config)
      .then(response => {
        console.log(response);
        let items: [] = response.data.items;
        if (items) {
          let filtered: never[] = items.filter((e:any) => {
            let title: string = e.title;
            if (title.search('토스') >= 0) {
              return true;
            }
          });
          console.log(filtered);
          this.setState({result: filtered});
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Input keyword then, press 'SEARCH" button</p>
          <input type="text" onChange={this.changeText.bind(this)}></input>
          <br/>
          <button onClick={this.query.bind(this)}>SEARCH</button>
        </header>
      </div>
    );
  }
}

export default App;
