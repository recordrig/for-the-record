import * as React from "react";
import { storiesOf } from "@storybook/react";
import Footnotes from "./Footnotes";

storiesOf("Footnotes", module).add("default", () => (
  <Footnotes>
    <p>
      1. Nam elit diam, laoreet lobortis sagittis vitae, eleifend in purus.
      Nullam luctus odio eu velit euismod porttitor. Praesent mattis tortor
      vitae feugiat pharetra. Aenean interdum eget massa sit amet fermentum. In
      enim lectus, pretium dictum leo sit amet, placerat semper nibh. In
      lobortis, dolor quis convallis ultrices, enim ante viverra tortor, vitae
      placerat justo massa rhoncus quam. Aenean pellentesque massa mi, ut
      aliquet lacus elementum nec. Nulla vulputate felis tortor, sit amet
      interdum dui facilisis in. Suspendisse eget arcu ultricies, dignissim quam
      ac, porta sapien. Suspendisse tellus orci, vehicula rutrum semper nec,
      molestie vitae metus. Vivamus dapibus maximus efficitur. Phasellus auctor
      cursus ornare.
    </p>
    <p>
      2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus
      orci at lectus commodo dictum. Donec id metus purus. Ut quis urna gravida
      velit porttitor convallis ac at nisl. In vitae tortor sed erat convallis
      molestie in non turpis. Pellentesque venenatis est eu nulla dignissim
      fermentum.
    </p>
  </Footnotes>
));
