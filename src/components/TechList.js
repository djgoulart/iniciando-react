import React, { Component } from 'react'

import TechItem from './TechItem'

class TechList extends Component {
    state = {
        newTech: '',
        techs: []
    }

    //Executado assim que o componente aparece na tela
    componentDidMount(){
      const techs = localStorage.getItem('techs');

      if(techs) {
        this.setState({ techs: JSON.parse(techs) });
      }
    }

    //Executado sempre que houver alterações nas props ou estado
    componentDidUpdate(_, prevState) {
      if(prevState.techs !== this.state.techs) {
        localStorage.setItem('techs', JSON.stringify(this.state.techs));
      }
    }

    //Executado quando o componente deixa de existir
    //componentWillUnmount(){}

    handleInputChance = e => {
        this.setState({ newTech: e.target.value });
    }

    handleFormSubmit = e => {
        e.preventDefault();
        
        this.setState({ 
            techs: [ ...this.state.techs, this.state.newTech ],
            newTech: ''
        });
    }

    handleDelete = (tech) => {
        this.setState({ techs: this.state.techs.filter(t => t !== tech)});
    } 

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>{this.state.newTech}</h1>
                <ul>
                    {this.state.techs.map(tech => (
                    <TechItem 
                        key={tech} 
                        tech={tech} 
                        onDelete={() => this.handleDelete(tech)} 
                        />
                    ))}
                </ul>
                <input 
                    type="text" 
                    onChange={this.handleInputChance} 
                    value={this.state.newTech} 
                />
                <button type="submit">Salvar</button>
            </form>
        );
    }
}

export default TechList;