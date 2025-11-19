import Container from "../_components/Container";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Container.Row>
        <Container.Row.Column className="py-12">
          {children}
        </Container.Row.Column>
      </Container.Row>
    </Container>
  );
}

export default Layout;
