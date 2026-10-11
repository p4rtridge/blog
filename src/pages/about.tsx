import { Lede } from '../components/Index';
import { PageShell } from '../components/PageShell';
import site from '../../blog.config.json';

const seoTitle = site.about.title;
const seoDescription = site.about.description;

export default function About() {
  return (
    <PageShell seoTitle={seoTitle} seoDescription={seoDescription} current="about">
      <Lede>
        <p className="text-body">{site.bio}</p>
      </Lede>
    </PageShell>
  );
}
