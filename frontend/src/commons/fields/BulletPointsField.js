import * as React from 'react';
import { cloneElement, Children } from 'react';
import { sanitizeListRestProps, useListContext, useCreatePath, Link } from 'react-admin';
import classnames from 'classnames';
import { LinearProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap'
  },
  link: {},
}));

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = (e) => e.stopPropagation();

// Our handleClick does nothing as we wrap the children inside a Link but it is
// required by ChipField, which uses a Chip from material-ui.
// The material-ui Chip requires an onClick handler to behave like a clickable element.
const handleClick = () => {};

const BulletPointsField = (props) => {
  const { classes: classesOverride, className, children, linkType = 'edit', ...rest } = props;
  const createPath = useCreatePath();
  const { data, isLoading, resource } = useListContext(props);

  const classes = useStyles(props);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <ul className={classnames(classes.root, className)} {...sanitizeListRestProps(rest)}>
      {data?.map((record, i) => {
        const resourceLinkPath = !linkType ? false : createPath({ resource, type: linkType, id: record.id });

        if (resourceLinkPath) {
          return (
            <span key={record.id}>
              <Link classes={classes.link} to={resourceLinkPath} onClick={stopPropagation}>
                {cloneElement(Children.only(children), {
                  // Workaround to force ChipField to be clickable
                  onClick: handleClick,
                })}
              </Link>
            </span>
          );
        }

        return (
          <li key={record.id}>
            {children}
          </li>
        );
      })}
    </ul>
  );
};

export default BulletPointsField;
