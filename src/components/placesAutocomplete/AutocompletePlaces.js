import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress, 
  getLatLng,
} from 'react-places-autocomplete';

const AutocompletePlaces = ({address, setAddress, setCoordinates}) => {
    

    const handleSelect = async(value) => {
      const results = await geocodeByAddress(value)
      const latLng = await getLatLng(results[0])
      setAddress(results[0].formatted_address)
      setCoordinates(latLng)
    }

  return (
    <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        >
        {
          ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input {...getInputProps({placeholder: 'search'})} className='form-control' name="location"/>
              <div className='position-absolute w-25'>
                {loading? <div>...loading</div> : null}
                {suggestions.map((suggestion)=>{
                  const style = suggestion.active
                  ? { backgroundColor: '#0d6efd', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' , border:  "1px solid #369"};
                  return <div key={suggestion.place_id} {...getSuggestionItemProps(suggestion, {style})}>{suggestion.description}</div>
                })}
              </div>
            </div>
          )              
          }
    </PlacesAutocomplete>
  )
}

export default AutocompletePlaces