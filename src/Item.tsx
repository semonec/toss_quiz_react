import React, { Component } from 'react';

export interface ItemState {
    title?: string,
    link?: string,
};

export interface ItemProps {
    item: ItemState,
}

export class Item extends Component<ItemProps, ItemState> {
    constructor(props: ItemProps) {
        super(props);
        this.state = {
            title: props.item && props.item.title,
            link: props.item && props.item.link,
        }
    }

    compareItem(item: ItemState) {
        return this.props.item.link !== item.link ||  this.props.item.title !== item.title; 
    }
    shouldComponentUpdate(nextProps: ItemProps, nextState: ItemState) {
        if (this.compareItem(nextProps.item)) {
            this.setState({
                title: nextProps.item.title,
                link: nextProps.item.link,
            });
            return true;
        }
        return false;
    }

    render() {
        return (
            <div>
                <a href={this.state.link} target="_blank">{this.state.title}</a>
            </div>
        );
    }
}