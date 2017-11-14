import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as ClassroomActions from '../actions/classroom';

class AssignmentSettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentID: 0,
      suggestions: [],
      newName: '',
      newDescription: ''
    };

    this.closeAssignmentSettingsPage = this.closeAssignmentSettingsPage.bind(this);
    this.goBackToClassroom = this.goBackToClassroom.bind(this);

    this.handleUpdateAssignment = this.handleUpdateAssignment.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  componentWillUpdate(nextProps) {
    this.state.newName = nextProps.assignment.name;
    this.state.newDescription = nextProps.assignment.description;
  }

  closeAssignmentSettingsPage() {
    // browserHistory.push(this.props.previousPath);
    browserHistory.push('/');
  }

  goBackToClassroom() {
    browserHistory.push(`/classrooms/${this.props.classroom.id}`);
  }

  handleUpdateAssignment(e) {
    this.props.classroom.assignments.forEach((assignment) => {
      if (assignment.id === this.props.assignment.id) {
        assignment.name = this.state.newName;
        assignment.description = this.state.newDescription;
      }
    });

    this.props.updateClassroom();
  }

  handleNameChange(event) {
    this.setState({ newName: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ newDescription: event.target.value });
  }

  render() {
    return (
      <div
        className="assignment-settings"
        aria-label="assignment settings"
        tabIndex="0"
        role="main"
        id="assignmentSettings"
      >
        <form className="assignment-settings__form">
          Name:
          <br />
          <input
            className="assignment-settings__form-element"
            type="text"
            value={this.state.newName}
            onChange={this.handleNameChange}
          />
          <br />
          Description:
          <br />
          <textarea
            className="assignment-settings__form-element assignment-settings__form-element-textarea"
            type="text"
            value={this.state.newDescription}
            onChange={this.handleDescriptionChange}
            cols="50"
            rows="4"
          >
          </textarea>
          <br />
          <input
            className="assignment-settings__form-element"
            type="button"
            value="Update"
            onClick={this.handleUpdateAssignment}
          />
        </form>
      </div>
    );
  }
}

AssignmentSettingsForm.propTypes = {
  classroom: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string.isRequired,
    assignments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired
    })).isRequired,
    instructors: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired,
    students: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  updateClassroom: PropTypes.func.isRequired,
  assignment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired
};

AssignmentSettingsForm.defaultProps = {};

function mapStateToProps(state) {
  return {
    assignment: state.assignment
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ClassroomActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentSettingsForm);