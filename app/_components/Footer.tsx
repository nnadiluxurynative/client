import Link from "next/link";
import Container from "./Container";
import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsWhatsapp,
} from "react-icons/bs";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-foreground text-[#a3a3a3] pt-10 text-sm">
      <Container>
        <Container.Row>
          <Container.Row.Column className="sm:w-1/2 lg:w-1/4">
            <Link href="/">
              <Logo fill="#ffffff" />
            </Link>
            <p className="text-sm mt-4">
              Celebrating culture, craftsmanship, and luxury through curated
              collections designed to elevate your heritage.
            </p>
          </Container.Row.Column>
          <Container.Row.Column className="sm:w-1/2 lg:w-1/4">
            <h4 className="text-sm mb-3 font-medium text-white uppercase">
              Explore
            </h4>
            <ul className="flex flex-col gap-y-3 [&_a]:hover:text-[#e3e3e3]">
              <li>
                <Link href="/shop">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </Container.Row.Column>
          <Container.Row.Column className="sm:w-1/2 lg:w-1/4">
            <h4 className="text-sm mb-3 text-white font-medium uppercase">
              Shop
            </h4>
            <ul className="flex flex-col gap-y-3 [&_a]:hover:text-[#e3e3e3]">
              <li>
                <Link href="/shop">All Products</Link>
              </li>
              <li>
                <Link href="/collections">Collections</Link>
              </li>
              <li>
                <Link href="/cart">Search</Link>
              </li>
            </ul>
          </Container.Row.Column>
          <Container.Row.Column className="sm:w-1/2 lg:w-1/4">
            <h4 className="text-sm mb-3 text-white uppercase font-medium">
              Contact
            </h4>
            <ul className="flex flex-col gap-y-3 [&_a]:hover:text-[#e3e3e3]">
              <li>
                <p>Enugu, Nigeria</p>
              </li>
              <li>
                <p>+234 706 267 6821</p>
              </li>
              <li>
                <p>contact@nnadiluxurynative.com</p>
              </li>
            </ul>
          </Container.Row.Column>
        </Container.Row>
      </Container>
      {/* Copyright */}
      <div className="border-t border-[#2e2e2e] mt-12 py-6">
        <Container>
          <Container.Row>
            <Container.Row.Column className="flex flex-wrap gap-4 justify-between items-center">
              <p>
                © {new Date().getFullYear()} Nnadi Luxury Native. All rights
                reserved.
              </p>
              {/* Social media links */}
              <ul className="flex items-center gap-3">
                <li>
                  <Link
                    href="https://www.facebook.com"
                    target="_blank"
                    className="button"
                  >
                    <BsFacebook size={22} fill="#ffffff" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com"
                    target="_blank"
                    className="button"
                  >
                    <BsTwitterX size={22} fill="#ffffff" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com"
                    target="_blank"
                    className="button"
                  >
                    <BsInstagram size={22} fill="#ffffff" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com"
                    target="_blank"
                    className="button"
                  >
                    <BsWhatsapp size={22} fill="#ffffff" />
                  </Link>
                </li>
              </ul>
            </Container.Row.Column>
          </Container.Row>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
