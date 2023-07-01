import React from "react";
import { useState, useEffect } from "react";

function NewRecordForm() {
  const [formData, setFormData] = useState({
    treeType: "",
    speciesType: "",
    species: "",
    age: "",
    description: "",
    surrounding: "",
    vigour: "",
    condition: "",
    diameter: "",
    radius: "",
    height: "",
  });

  const {
    treeType,
    speciesType,
    species,
    age,
    description,
    surrounding,
    vigour,
    condition,
    diameter,
    radius,
    height,
  } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="formGroup">
            <label for="treeType">Where is this tree located?</label>
            <input
              type="text"
              className="form-control"
              id="treeType"
              name="treeType"
              value={treeType}
              placeholder="Eg. Park tree, street tree"
              onChange={onChange}
            />
          </div>
          <div className="formGroup">
            <label for="speciesType">What species of tree is it?</label>
            <input
              type="text"
              className="form-control"
              id="speciesType"
              name="speciesType"
              value={speciesType}
              placeholder="Eg. English Oak"
              onChange={onChange}
            />
          </div>
          <div className="formGroup">
            <label for="species">
              What is the scientific name for the species?
            </label>
            <input
              type="text"
              className="form-control"
              id="species"
              name="species"
              value={species}
              placeholder="Eg. Quercus robur"
              onChange={onChange}
            />
          </div>
          <div className="formGroup">
            <label for="age">How old is this tree?</label>
            <input
              type="text"
              className="form-control"
              id="age"
              name="age"
              value={age}
              placeholder="Eg. Juvenile, Mature, Snag"
              onChange={onChange}
            />
          </div>
          <div className="formGroup">
            <label for="description">Please give a visual description.</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={description}
              placeholder="Is there any damage to the tree? Is it flowering?"
              onChange={onChange}
            />
          </div>
          <div className="formGroup">
            <label for="surrounding">
              Describe the environmental context of the tree.
            </label>
            <input
              type="text"
              className="form-control"
              id="surrounding"
              name="surrounding"
              value={surrounding}
              placeholder="Eg. Grass, concrete, bare ground"
              onChange={onChange}
            />
          </div>
          <div className="formGroup">
            <label for="vigour">Describe the vigour of the tree.</label>
            <input
              type="text"
              className="form-control"
              id="vigour"
              name="vigour"
              value={vigour}
              placeholder="Eg. High, fair, low"
              onChange={onChange}
            />
          </div>
          <div className="formGroup">
            <label for="condition">How is the condition of the tree?</label>
            <input
              type="text"
              className="form-control"
              id="condition"
              name="condition"
              value={condition}
              placeholder="Eg. Good, bad"
              onChange={onChange}
            />
          </div>
          <div className="formGroup">
            <label for="diameter">
              Estimate the diameter of the tree (cm).
            </label>
            <input
              type="text"
              className="form-control"
              id="diameter"
              name="diameter"
              value={diameter}
              placeholder="Eg. 80"
              onChange={onChange}
            />
          </div>
          <div className="formGroup">
            <label for="radius">Estimate the radius of the tree (m).</label>
            <input
              type="text"
              className="form-control"
              id="radius"
              name="radius"
              value={radius}
              placeholder="Eg. 0.4"
              onChange={onChange}
            />
          </div>
          <div className="formGroup">
            <label for="height">Estimate the height of the tree (m).</label>
            <input
              type="text"
              className="form-control"
              id="height"
              name="height"
              value={height}
              placeholder="Eg. 1.5"
              onChange={onChange}
            />
          </div>
          <div className="formGroup">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewRecordForm;
