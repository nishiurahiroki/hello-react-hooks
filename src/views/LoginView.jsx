import React, {useState} from 'react'

import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

import AuthManager from '../auth/AuthManager'

const iconStyle = {
  marginRight : '0.5vw'
}

const LoginView = props => {
  const [mailAddress, setMailAddress] = useState('')
  const [password, setPassword] = useState('')

  const moveView = viewName => props.history.push(`/${viewName}`)

  const login = () => {
    AuthManager.auth({
      id : mailAddress,
      password
    }).then(() => {
      props.setActiveUserId(AuthManager.getActiveUserId())
      moveView('costInput')
    }).catch(e => {
      // TODO error handling.
      console.log(e)
      props.showMessage('ログインに失敗しました')
    })
  }

  return (
    <div style={{marginTop : '3vh', textAlign : 'center'}}>
      <div>
        <TextField
          id="mail-address"
          label="メールアドレス"
          value={mailAddress}
          onChange={e => setMailAddress(e.target.value)}
        />
      </div>

      <div>
        <TextField
          id="password"
          label="パスワード"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div style={{marginTop : '3vh'}}>
        <Button
          variant="contained"
          color="primary"
          onClick={login}
        >
          <PersonIcon style={iconStyle} />
          ログイン
        </Button>
      </div>

      <div style={{marginTop : '10.5vh'}}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => moveView('addUser')}
        >
          <PersonAddIcon style={iconStyle} />
          ユーザー新規登録
        </Button>
      </div>
    </div>
  )
}

export default connect(
  ({}) => ({}),
  {
    showMessage : messageText => ({ type : 'ShowMessage', messageText }),
    setActiveUserId : activeAuthUserId => ({type : 'SetActiveUserId', activeAuthUserId})
  }
)(LoginView)
