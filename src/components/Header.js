import React from 'react'
import { Button, Segment, Icon } from 'semantic-ui-react'
import { withRouter } from "react-router-dom"

const styles = {
    header: {
        display: 'flex',
        padding: '10px',
        justifyContent: 'center',
        backgroundColor: '#bdd2e6',
        borderRadius: 0
      },
}

const Header = ({location, history}) => {
    return (
        <Segment style={styles.header}>
          <Button.Group>
          <Button
            size='tiny'
            color='blue'
            active={location.pathname === '/'}
            onClick={() => {
              if (location.pathname === '/') return;
              history.push('/')}
            }
        >
          <Icon name='dashboard' /> Dashboard
        </Button>
        <Button
          size='tiny'
          active={location.pathname === '/rate'}
          color='blue'
          onClick={() => {
            if (location.pathname === '/rate') return;
            history.push('/rate');
          }

          }
        >
          <Icon color='red' name='like' /> Rate
        </Button>
        </Button.Group>
        </Segment>
    )
}

export default withRouter(Header)
