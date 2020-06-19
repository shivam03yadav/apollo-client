import React from 'react';
import schema from '../helper/inputSchema';
import {
  selectOptions,
  radioOptionsCricket,
  radioOptionsFootball,
} from '../../config/constants';
import {
  TextField,
  SelectField,
  RadioGroup,
  ButtonFunction,
} from '../../components/index';

class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      touched: {
        name: false,
        sport: false,
        cricket: false,
        football: false,
      },
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value }, () => {
      console.log(this.state);
    });
  };

  handleOnclick = () => {
    console.log(this.state);
  };

  handleOnclick = () => {};

  isTouched = () => {
    const {
      name, sport, cricket, football,
    } = this.state;
    return !!(name || sport || cricket || football);
  };

  handleSportChange = (event) => {
    if (event.target.value === 'Select') {
      return this.setState({ sport: '', football: '', cricket: '' });
    }
    return this.setState({
      sport: event.target.value,
      football: '',
      cricket: '',
    });
  };

  handlePositionChange = (event) => {
    const { sport } = this.state;
    return this.setState({ [sport]: event.target.value });
  };

  RadioOption = () => {
    let { radioValue } = this.state;
    const { sport } = this.state;
    if (sport === 'cricket') {
      radioValue = radioOptionsCricket;
    } else if (sport === 'football') {
      radioValue = radioOptionsFootball;
    }
    return radioValue;
  };

  getError = (field) => {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
  };

  hasErrors = () => {
    try {
      schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  };

  handleOnBlur = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  };

  render() {
    const { sport } = this.state;
    console.log(this.state);
    return (
      <>
        <p>
          <b>Name:</b>
        </p>
        <TextField
          error={this.getError('name')}
          onChange={this.handleNameChange}
          onBlur={() => this.handleOnBlur('name')}
        />
        <p>
          <b>Select the game you play?</b>
        </p>
        <SelectField
          error={this.getError('sport')}
          onChange={this.handleSportChange}
          options={selectOptions}
          onBlur={() => this.handleOnBlur('sport')}
        />
        <div>
          {sport === '' || sport === 'Select' ? '' : (
            <>
              <p>
                <b>What you do?</b>
              </p>
              <RadioGroup
                error={this.getError(sport)}
                options={this.RadioOption()}
                onChange={this.handlePositionChange}
                onBlur={() => this.handleOnBlur(sport)}
              />
            </>
          )}
        </div>

        <div>
          <ButtonFunction value="Cancel" onClick={this.handleOnclick} />
          <ButtonFunction
            value="Submit"
            disabled={!this.isTouched() || this.hasErrors()}
            onClick={this.handleOnclick}
          />
        </div>
      </>
    );
  }
}
export default InputDemo;
