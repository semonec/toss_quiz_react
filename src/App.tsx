import React, { Component } from 'react';
import './App.css';
import axios, { AxiosRequestConfig } from 'axios';
import { Item } from './Item';

export interface AppState {
  text?: string,
  result: never[],
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
    axios.get(`https://openapi.naver.com/v1/search/news.json?query=${this.state.text}`, config)
      .then(response => {
        console.log(response);
        let items: [] = response.data.items;
        if (items) {
          let filtered: never[] = items.filter((e:any) => {
            let title: string = e.title;
            if (title.search('토스') >= 0 || title.search('퀴즈') >= 0) {
              return true;
            }
          });
          console.log(filtered);
          this.setState({result: filtered});
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({result: []});
      })
  }

  render() {
    let list;
    if (this.state.result.length) {
      list = this.state.result.map((item, index) => {
        return <Item item={item} />;
      });
    }
    return (
      <div className="App">
        <header className="App-header">
          <p>Input keyword then, press 'SEARCH' button</p>
          <input type="text" onChange={this.changeText.bind(this)}></input>
          <br/>
          <button onClick={this.query.bind(this)}>SEARCH</button>
          {list}
        </header>
      </div>
    );
  }
}

export default App;
