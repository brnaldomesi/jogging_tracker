import { Button, Table } from 'reactstrap'
import React, { Component } from 'react'
import { deleteUser, getUsers } from 'redux/modules/user'
import { usersListSelector, usersParamsSelector } from 'redux/selectors'

import { Link } from 'react-router-dom'
import MdPersonAdd from 'react-icons/lib/md/person-add'
import Pagination from 'components/Pagination'
import PropTypes from 'prop-types'
import ReportModal from 'containers/ReportModal'
import { compose } from 'redux'
import confirm from 'containers/ConfirmModal'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { show } from 'redux-modal'
import { ucFirst } from 'helpers'
import { withRouter } from 'react-router'

class UsersList extends Component {
  static propTypes = {
    deleteUser: PropTypes.func,
    getUsers: PropTypes.func,
    usersList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getUsers, params } = this.props
    getUsers({ params })
  }

  handleDeleteUser = (id) => () => {
    const { deleteUser } = this.props
    confirm('Are you sure to delete the user?').then(
      () => {
        deleteUser({ id })
      }
    )
  }

  handleViewReport = (user) => () => {
    const { show } = this.props
    show('reportModal', { user })
  }

  handlePagination = (pagination) => {
    const { getUsers, params } = this.props
    getUsers({
      params: {
        ...pick(params, ['page', 'page_size']),
        ...pagination
      }
    })
  }

  render() {
    const { usersList, params } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])

    return (
      <div>
        <h2 className='text-center mb-5'>Manage Users</h2>
        <div className='text-right mb-2'>
          <Link to='/users/new' className='btn btn-primary'>
            <MdPersonAdd size='1.2em' /> Add a New User
          </Link>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList && usersList.map((user, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>{ucFirst(user.role)}</td>
                <td className='text-right'>
                  <Button color='info' size='sm' onClick={this.handleViewReport(user)}>
                    Report
                  </Button>
                  {' '}
                  <Button color='primary' tag={Link} size='sm' to={`/users/edit/${user.id}`}>
                    Edit
                  </Button>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDeleteUser(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination pagination={pagination} setPagination={this.handlePagination} />
        <ReportModal />
      </div>
    )
  }
}

const selector = createStructuredSelector({
  usersList: usersListSelector,
  params: usersParamsSelector
})

const actions = {
  getUsers,
  deleteUser,
  show
}

export default compose(
  connect(selector, actions),
  withRouter
)(UsersList)
