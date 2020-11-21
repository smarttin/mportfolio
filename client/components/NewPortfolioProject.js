import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Layout from './shared/Layout';
import { useMutation } from '@apollo/client';
import { CREATE_PORTFOLIO } from '../apollo/queries';

const NewPortfolioProject = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const [createPortfolio, { loading, error }] = useMutation(CREATE_PORTFOLIO, {
    update: () => {},
    onError: (err) => console.log(err),
    onCompleted: () => console.log('Completed'),
  });

  useEffect(() => {
    register({ name: 'startDate' });
    register({ name: 'endDate' });
  }, [register]);

  // useEffect(() => {
  //   const { startDate, endDate } = initialData;

  //   if (startDate) {
  //     setStartDate(new Date(parseInt(startDate, 10)));
  //   }

  //   if (endDate) {
  //     setEndDate(new Date(parseInt(endDate, 10)));
  //   }
  // }, [initialData]);

  const handleDateChange = (dateType, setDate) => (date) => {
    setValue(
      dateType,
      (date && new Date(date.setHours(0, 0, 0, 0)).toISOString()) || date
    );
    setDate(date);
  };

  const onSubmit = (formData) => {
    createPortfolio({ variables: formData });
  };

  // const handleStartDate = (date) => {
  //   setValue('startDate', date.toISOString());
  //   setStartDate(date);
  // };
  // const handleEndDate = (date) => {
  //   setValue('endDate', date.toISOString());
  //   setEndDate(date);
  // };

  return (
    <Layout>
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h3 className="page-title">Create New Portfolio Project</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  ref={register}
                  name="title"
                  type="text"
                  className="form-control"
                  id="title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">Company</label>
                <input
                  ref={register}
                  name="company"
                  type="text"
                  className="form-control"
                  id="company"
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">Company Website</label>
                <input
                  ref={register}
                  name="companyWebsite"
                  type="text"
                  className="form-control"
                  id="companyWebsite"
                />
              </div>

              <div className="form-group">
                <label htmlFor="street">Location</label>
                <input
                  ref={register}
                  name="location"
                  type="text"
                  className="form-control"
                  id="location"
                />
              </div>

              <div className="form-group">
                <label htmlFor="street">Job Title</label>
                <input
                  ref={register}
                  name="jobTitle"
                  type="text"
                  className="form-control"
                  id="jobTitle"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  ref={register}
                  name="description"
                  rows="5"
                  type="text"
                  className="form-control"
                  id="description"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="street">Start Date</label>
                <div>
                  <DatePicker
                    showYearDropdown
                    selected={startDate}
                    onChange={handleDateChange('startDate', setStartDate)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="street">End Date</label>
                <div>
                  <DatePicker
                    showYearDropdown
                    selected={endDate}
                    disabled={!endDate}
                    onChange={handleDateChange('endDate', setEndDate)}
                  />
                </div>
              </div>

              <div className="form-group">
                {endDate && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      handleDateChange('endDate', setEndDate)(null)
                    }
                  >
                    No End Date
                  </button>
                )}
                {!endDate && (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() =>
                      handleDateChange('endDate', setEndDate)(new Date())
                    }
                  >
                    Set End Date
                  </button>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewPortfolioProject;
