import React, { useState } from 'react'
import './recipes.css'
import { Button } from 'react-bootstrap'
import AddRecipeModal from './AddRecipeModal'

const Recipes = () => {
    const [showAddRecipeModal, setShowAddRecipeModal] = useState(false)

  return (
    <div className='recipes_container'>
        <div className='list_container'>
            <h3>Your Recipes</h3>
            <p>there aren´t recipes</p>
            <ul>
                <li><a href="https://www.mozilla.org/es-ES/">Golden</a></li>
                <li>Scottish</li>
                <li>Honey</li>
                <li>IPA</li>
            </ul>
            <div className='w-100 d-flex justify-content-end'>
                <Button variant='primary' className='addRecipeButton' onClick={()=>setShowAddRecipeModal(true)}>Add a new Recipe</Button>
            </div>
        </div>

        <AddRecipeModal
            show={showAddRecipeModal}    
            setShow={setShowAddRecipeModal}    
        />

    </div>
  )
}

export default Recipes