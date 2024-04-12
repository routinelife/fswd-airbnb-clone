// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import './posts.scss';

class Posts extends React.Component {
  state = {
    title: '',
    description: '',
    city: '',
    country: '',
    property_type: '',
    price_per_night: '',
    max_guests: '',
    bedrooms: '',
    beds: '',
    baths: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  signup = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });

    fetch('/api/properties', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        property: {
            title: this.state.title,
            description: this.state.description,
            city: this.state.city,
            country: this.state.country,
            property_type: this.state.property_type,
            price_per_night: this.state.price_per_night,
            max_guests: this.state.max_guests,
            bedrooms: this.state.bedrooms,
            beds: this.state.beds,
            baths: this.state.baths
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.user) {
          this.login();
        }
      })
      .catch(error => {
        this.setState({
          error: 'Could not sign up.',
        })
      })
  }

  login = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });

    fetch('/api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          const params = new URLSearchParams(window.location.search);
          const redirect_url = params.get('redirect_url') || '/';
          window.location = redirect_url;
        }
      })
      .catch(error => {
        this.setState({
          error: 'Could not log in.',
        })
      })
  }

  render () {
    const { title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={this.signup}>
          <input name="title" type="text" className="form-control form-control-lg mb-3" placeholder="title" value={title} onChange={this.handleChange} required />
          <input name="description" type="text" className="form-control form-control-lg mb-3" placeholder="description" value={description} onChange={this.handleChange} required />
          <input name="city" type="text" className="form-control form-control-lg mb-3" placeholder="city" value={city} onChange={this.handleChange} required />
          <input name="country" type="text" className="form-control form-control-lg mb-3" placeholder="country" value={country} onChange={this.handleChange} required />
          <input name="property_type" type="text" className="form-control form-control-lg mb-3" placeholder="property_type" value={property_type} onChange={this.handleChange} required />
          <input name="price_per_night" type="integer" className="form-control form-control-lg mb-3" placeholder="price_per_night" value={price_per_night} onChange={this.handleChange} required />
          <input name="max_guests" type="integer" className="form-control form-control-lg mb-3" placeholder="max_guests" value={max_guests} onChange={this.handleChange} required />
          <input name="bedrooms" type="integer" className="form-control form-control-lg mb-3" placeholder="bedrooms" value={bedrooms} onChange={this.handleChange} required />
          <input name="beds" type="integer" className="form-control form-control-lg mb-3" placeholder="beds" value={beds} onChange={this.handleChange} required />
          <input name="baths" type="integer" className="form-control form-control-lg mb-3" placeholder="baths" value={baths} onChange={this.handleChange} required />

          <button type="submit" className="btn btn-danger btn-block btn-lg">Post</button>
        </form>
        <hr/>
        <p className="mb-0">Already have an account? <a className="text-primary" onClick={this.props.toggle}>Log in</a></p>
      </React.Fragment>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Posts />,
    document.body.appendChild(document.createElement('div')),
  )
})
