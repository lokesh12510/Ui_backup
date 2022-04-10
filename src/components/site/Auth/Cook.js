import React, {useState} from "react";

import Map from "../../ui/Map";
import FormEditor from "../../ui/FormEditor";
import * as commonHelper from "../../../utils/helpers/commonHelper";

const Cook = (props) => {
    const [searchLocation, setSearchLocation] = useState('');
    const handleInputChange = (e) => {
        props.handleInputChange(e);
    }

    return (
        <div className="card py-0">
            <form onSubmit={(e) => props.onSubmit(e)}>
                {props.errors.length > 0 ? <p> Validation Errors </p> : ""}
                <div className="form-group py-2">
                    <label>Cook Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={props.values.name}
                        onChange={handleInputChange}
                        placeholder="Enter Name"
                    />
                    <span className="text-danger">{props.renderError('name')}</span>
                </div>

                <div className="form-group py-2">
                    <label>Kitchen Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id=""
                        name="kitchen_name"
                        value={props.values.kitchen_name}
                        onChange={handleInputChange}
                        placeholder="Enter Last Name"
                    />
                    <span className="text-danger">{props.renderError('kitchen_name')}</span>
                </div>

                <div className="form-group py-2">
                    <label>Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={props.values.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                    />
                    <span className="text-danger">{props.renderError('email')}</span>
                </div>

                <div className="form-group py-2">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={props.values.password}
                        onChange={handleInputChange}
                        placeholder="Enter Password"
                    />
                    <span className="text-danger">{props.renderError('password')}</span>
                </div>

                <div className="form-group py-2">
                    <label>Mobile</label>
                    <input
                        type="text"
                        className="form-control"
                        id=""
                        name="mobile"
                        value={props.values.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter Mobile"
                    />
                    <span className="text-danger">{props.renderError('mobile')}</span>
                </div>

                <div className="form-group py-2">
                    <label>Description</label>
                    <FormEditor
                        editorId="description"
                        editorData={props.values.description}
                        onEditorChange={(data) => {
                            props.setValues(p => ({...p, ['description']: data}));
                        }}
                    />
                </div>

                <div className="form-group py-2">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id=""
                        name="address"
                        value={props.values.address}
                        onChange={handleInputChange}
                        placeholder="Enter Address"
                    />
                    <span className="text-danger">{props.renderError('city')}</span>
                </div>

                <div className="form-group py-2">
                    <label>City</label>
                    <input
                        type="text"
                        className="form-control"
                        id=""
                        name="city"
                        value={props.values.city}
                        onChange={handleInputChange}
                        placeholder="Enter City"
                    />
                    <span className="text-danger">{props.renderError('city')}</span>
                </div>

                <div className="form-group py-2">
                    <label>Radius</label>
                    <select 
                        name="radius_in_km" 
                        value={ props.values.radius_in_km } 
                        onChange={ handleInputChange } 
                        className="form-control" 
                    >
                        <option value="">-- Select --</option>
                        {commonHelper.getRadiusOptions().map((option, index) => {
                            return (
                                <option key={index} value={ option.value }>{ option.label }</option>
                            );
                        })}
                    </select>
                    <span className="text-danger">{props.renderError('radius_in_km')}</span>
                </div>

                <div className="form-group py-2">
                    <label>Cook Location</label>
                    <Map 
                        value={{
                            latitude: props.values.latitude,
                            longitude: props.values.longitude,
                            address: searchLocation,
                            circleRadius: (props.values.radius_in_km * 1000),
                        }}
                        onChange={(location) => {
                            setSearchLocation(location.address);
                            handleInputChange({
                                target: {
                                    name: 'latitude',
                                    value: location.latitude,
                                }
                            });
                            handleInputChange({
                                target: {
                                    name: 'longitude',
                                    value: location.longitude,
                                }
                            });
                        }}
                    />
                    <span className="text-danger">{props.renderError('latitude')}</span>
                    <span className="text-danger">{props.renderError('longitude')}</span>
                </div>

                <div className="form-group py-2">
                    <label>Profile</label>
                    <input
                        type="file"
                        className="form-control"
                        name="profile_file"
                        accept="image/*"
                        onChange={handleInputChange}
                    />
                    <span className="text-danger">{props.renderError('profile_file')}</span>
                    {props.values.profile && (
                        <div className="form-group col-md-6 py-2">
                            <img src={props.values.profile} className="img-thumbnail" style={{maxHeight: "100px"}}
                                 alt="image"/>
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary mt-2">
                    Submit
                </button>
            </form>
        </div>
    )

}
export default Cook;