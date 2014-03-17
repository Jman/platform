<?php

namespace Migration\v1_0;

use Doctrine\DBAL\Schema\Schema;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Oro\Bundle\MigrationBundle\Migration\Migration;
use Oro\Bundle\MigrationBundle\Migration\QueryBag;

class Test2BundleMigration10 implements Migration, ContainerAwareInterface
{
    /** @var ContainerInterface */
    protected $container;

    public function up(Schema $schema, QueryBag $queries)
    {
        $sqls = $this->container->get('test_service')->getQueries();
        foreach ($sqls as $sql) {
            $queries->addQuery($sql);
        }
    }

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }
}