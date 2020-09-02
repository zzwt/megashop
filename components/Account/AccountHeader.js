import { Segment, Header, Icon, Label } from "semantic-ui-react";

function AccountHeader({ user }) {
  return (
    <Segment color="violet" inverted secondary>
      <Label
        icon="privacy"
        ribbon
        color="teal"
        size="large"
        style={{ textTransform: "capitalize" }}
        content={user.role}
      />
      <Header as="h2" icon inverted textAlign="center">
        <Icon name="user" />
        {user.name}
        <Header.Subheader>{user.email}</Header.Subheader>
        <Header.Subheader>Joined {user.createdAt}</Header.Subheader>
      </Header>
    </Segment>
  );
}

export default AccountHeader;
