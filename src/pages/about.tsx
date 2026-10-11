import { Lede } from '../components/Index';
import { PageShell } from '../components/PageShell';
import site from '../../blog.config.json';

const seoTitle = 'About';
const seoDescription = 'A few words about me.';

export default function About() {
  return (
    <PageShell seoTitle={seoTitle} seoDescription={seoDescription} current="about">
      <Lede>
        <p className="text-body">{site.bio}</p>
      </Lede>
    </PageShell>
  );
}
